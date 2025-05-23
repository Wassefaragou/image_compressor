# 🧠 Image Compression and Reconstruction using Convolutional Autoencoder

This project implements a convolutional autoencoder model using TensorFlow/Keras to compress and reconstruct color images. It includes a web interface that allows users to encode images into a compressed format and later reconstruct them. The system can convert images into `.npz` files using the encoder and visualize reconstructions using the decoder.

---

## 🗂️ Project Structure

```
├── autoencoder.py
├── encoder.py
├── decoder.py
├── models/
│ └── models Pre-trained
├── npz_files/
│ └── (fichiers .npz encodés)
├── image_compressor_interface/
│ ├── api/
│ │ ├── app.py
│ │ ├── encoder_model.keras
│ │ └── decoder_model.keras
│ ├── app/
│ ├── components/
│ ├── hooks/
│ ├── lib/
│ └── public/
└── README.md
```

---

## 💻 Technologies Used

- Python 3
- TensorFlow / Keras
- NumPy / Pillow
- Flask (Backend API)
- React + Next.js (Frontend interface)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Wassefaragou/image_compressor.git
cd image_compressor
```

### 2. Set Up Python Environment

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

pip install -r requirements.txt
```

### 3. Train the Model (Optional)

If you haven't trained the model yet, you can run:

```bash
python autoencoder.py
```

### 4. Start Flask API Server

```bash
cd image_compressor_interface/api
python app.py
```

This will expose endpoints like:

- `POST /encode` to encode an image and return `.npz`
- `POST /decode` to reconstruct an image from a `.npz` file

---

## 🌐 Frontend Interface

The user interface is located in the `image_compressor_interface` directory. It lets users upload an image, visualize its compressed version, or load a `.npz` file to reconstruct the original.

### 1. Navigate to Interface Directory

```bash
cd image_compressor_interface
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The interface will be accessible at `http://localhost:3000`

---

## 📸 How to Use the Interface

1. **Upload an Image:**
   - Use the first button to select an image from your local device.
   - The image will be sent to the Flask backend where it's encoded using the trained encoder.
   - A `.npz` file containing the compressed image is generated.

2. **Load a `.npz` File:**
   - You can upload a previously saved `.npz` file to reconstruct the image.
   - The decoder processes the file and displays the reconstructed image.

3. **Download:**
   - Both the `.npz` file and the reconstructed image can be downloaded directly from the interface.

---

## 📦 Example Files

- Sample encoded `.npz` are provided in the `npz_files/` folder for testing purposes.

---

## 📌 Notes

- The encoder reduces a `256x256x3` image into a compact tensor of shape `16x16x32`, drastically decreasing storage size.
- Using `.npz` provides compressed and flexible multi-array storage (compared to `.npy`).
- Loss in reconstruction quality is expected due to compression and model limitations.

---


## 📄 License

Feel free to use and modify it for educational or research purposes.

---

## 👨‍💻 Author

Developed by ARAGOU Wassef — feel free to reach out via GitHub for feedback or collaboration!