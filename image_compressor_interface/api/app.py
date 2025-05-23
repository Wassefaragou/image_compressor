from flask import Flask, request, jsonify, send_file, abort
from flask_cors import CORS
import base64
import io
import os
import numpy as np
from PIL import Image
import tempfile
from tensorflow.keras.models import load_model
from flask import url_for

# Load your models
encoder = load_model('./api/encoder_model.keras')
decoder = load_model('./api/decoder_model.keras')

app = Flask(__name__)
CORS(app)

# Temp dir for the NPZ files
TEMP_DIR = tempfile.mkdtemp()

def preprocess_pil(pil_img: Image.Image, target_size=(256, 256)) -> np.ndarray:
    """
    Convert to RGB, resize, normalize to [0,1], and add batch dimension.
    """
    img = pil_img.convert('RGB').resize(target_size)
    arr = np.asarray(img, dtype=np.float32) / 255.0
    return np.expand_dims(arr, axis=0)


@app.route('/process_image', methods=['POST'])
def process_image():
    data = request.get_json(force=True)
    b64 = data.get('image')
    if not b64 or ',' not in b64:
        return jsonify({'error': 'No valid base64-encoded image provided'}), 400

    # Decode base64 and force 3-channel RGB
    _, imgstr = b64.split(',', 1)
    pil_img = Image.open(io.BytesIO(base64.b64decode(imgstr))).convert('RGB')
    
    pil_img1=pil_img.resize((256, 256))
    buffe1 = io.BytesIO()
    pil_img1.save(buffe1, format="PNG")
    processed = base64.b64encode(buffe1.getvalue()).decode('utf-8')

    # Preprocess and encode
    x = preprocess_pil(pil_img, target_size=(256, 256))
    encoded = encoder.predict(x).astype(np.float16)

    # Save NPZ to temp and return a download URL
    filename = data.get('filename', 'image').split('.')[0]
    npz_name = f"{filename}_encoded.npz"
    npz_path = os.path.join(TEMP_DIR, npz_name)
    np.savez(npz_path, encoded=encoded)

    # Build an absolute URL to download it
    download_url = url_for('download_file', filename=npz_name, _external=True)
    reconstructed_image = decoder.predict(encoded.astype(np.float32))[0]  # drop batch
    img = Image.fromarray((reconstructed_image * 255).clip(0,255).astype('uint8'))

    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return jsonify({
        'processed': f'data:image/png;base64,{processed}',
        'processed_image': f'data:image/png;base64,{processed_image_base64}',
        'encoded_file_url': download_url
    })


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    """Serve the NPZ file for download."""
    file_path = os.path.join(TEMP_DIR, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({'error': 'File not found'}), 404


@app.route('/reconstruct_from_npz', methods=['POST'])
def reconstruct_from_npz():
   
    if 'npz_file' not in request.files:
        return jsonify({'error': 'No NPZ file provided'}), 400

    npz_file = request.files['npz_file']
    npz_data = np.load(io.BytesIO(npz_file.read()))
    encoded = npz_data.get('encoded')
    if encoded is None:
        return jsonify({'error': 'Invalid NPZ file format'}), 400

    # Decode and reconstruct
    decoded = decoder.predict(encoded.astype(np.float32))[0]  # drop batch
    img = Image.fromarray((decoded * 255).clip(0,255).astype('uint8'))

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    b64_img = base64.b64encode(buf.getvalue()).decode('utf-8')

    return jsonify({
        'reconstructed_image': f"data:image/png;base64,{b64_img}"
    })


if __name__ == '__main__':
    # For local testing; in production use gunicorn/uwsgi
    app.run(debug=True)
