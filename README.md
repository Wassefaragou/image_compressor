# Autoencoder for Image Compression and Reconstruction

## 📚 Project Overview

This project implements **Autoencoders** for **dimensionality reduction** and **image reconstruction**.  
Built with TensorFlow/Keras, it compresses images into a latent space and reconstructs them with high fidelity.  
Two types of autoencoders are developed:
- A **U-Net Autoencoder** for high-quality reconstructions.
- A **Lightweight Autoencoder** for faster, smaller models.

The project also includes **separated encoder and decoder models** for efficient encoding and decoding processes.

---

## 📂 Project Structure

```bash
├── autoencoder.py          # Lightweight autoencoder (Conv2D + Conv2DTranspose)
├── autoencoder_2.py        # U-Net style autoencoder
├── encoder.py              # Script to encode an image and save compressed .npz
├── decoder.py              # Script to decode a compressed .npz into an image
├── /models/                # Folder where trained models are saved (.keras files)
├── /training_images/       # Folder containing images for training
├── /Image_compressed/      # Folder to store compressed encoded files
├── README.md               # (this file)
```

---

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Wassefaragou/image_compressor.git
   cd your-repo-name
   ```

2. **Install Requirements**
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the Autoencoder**
   ```bash
   python autoencoder.py
   # or
   python autoencoder_2.py
   ```

4. **Encode an Image**
   ```bash
   python encoder.py
   ```

5. **Decode and Reconstruct the Image**
   ```bash
   python decoder.py
   ```

---

## 🛠️ Requirements

- Python 3.8+
- TensorFlow 2.8+
- NumPy
- Pillow
- Matplotlib

You can create a `requirements.txt` like this if you want:

```text
tensorflow>=2.8
numpy
pillow
matplotlib
```

---

## 📈 Example Workflow

- **Input** ➔ Load a `256x256` image
- **Encode** ➔ Compress the image to a small latent representation
- **Save** ➔ Save the compressed version in `.npz`
- **Decode** ➔ Reconstruct the full image from compressed data

---

## ✨ Project By

Wassef Aragou | Guided by Prof. Youssef Lamrani  
*(Université Mohammed V de Rabat – EMI, 2024/2025)*  
