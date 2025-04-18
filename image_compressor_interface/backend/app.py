from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image
import numpy as np
# Import your autoencoder model here
# from autoencoder import AutoEncoder

app = Flask(__name__)
CORS(app)

# Initialize your autoencoder model here
# model = AutoEncoder()

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.json:
        return jsonify({'error': 'No image provided'}), 400

    # Get the base64 encoded image from the request
    image_data = request.json['image'].split(',')[1]
    image = Image.open(io.BytesIO(base64.b64decode(image_data)))

    # Convert image to numpy array
    image_array = np.array(image)

    # Process the image with your autoencoder model
    # Uncomment and modify these lines when you have your model ready
    # processed_array = model.process(image_array)
    # processed_image = Image.fromarray(processed_array.astype('uint8'))

    # For now, we'll just return the original image
    processed_image = image

    # Convert the processed image back to base64
    buffered = io.BytesIO()
    processed_image.save(buffered, format="PNG")
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return jsonify({'processed_image': f'data:image/png;base64,{processed_image_base64}'})

if __name__ == '__main__':
    app.run(debug=True)

