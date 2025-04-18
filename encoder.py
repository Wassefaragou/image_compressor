import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
import os
import matplotlib.pyplot as plt

# === Charger l'encodeur sauvegardé ===
encoder = load_model('./models/encoder_model.keras')

# === Charger une image et la prétraiter ===
def load_and_preprocess_image(image_path, target_size=(256, 256)):
    img = Image.open(image_path).convert('RGB')
    img = img.resize(target_size)
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)  # Ajouter la dimension batch

# test
image_path = 'training_images/Img_100.jpg'  
input_size = (256, 256)           

# === Prétraitement ===
img = load_and_preprocess_image(image_path, target_size=input_size)

# === Affichage de l'image utilisée (redimensionnée) ===
plt.imshow(img[0])
plt.title("Image d'entrée utilisée (256x256)")
plt.axis('off')
plt.show()

# === Encodage + réduction float16 ===
encoded_img = encoder.predict(img).astype(np.float16)

# === Sauvegarde compressée en .npz ===
np.savez_compressed('./Image_compressed/encoded_image.npz', encoded=encoded_img)