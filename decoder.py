import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import matplotlib.pyplot as plt

# === Charger le modèle décodeur sauvegardé ===
decoder = load_model('./models/decoder_model.keras')

# === Charger le fichier encodé compressé (.npz) ===
data = np.load('./Image_compressed/encoded_image.npz')
encoded_image = data['encoded']

# ⚠️ Convertir en float32 si encodé en float16
encoded_image = encoded_image.astype(np.float32)

# === Reconstruction de l'image ===
reconstructed_image = decoder.predict(encoded_image)

# === Affichage de l'image reconstruite ===
plt.figure(figsize=(6,6))
plt.imshow(reconstructed_image[0])
plt.title('Image reconstruite', fontsize=14)
plt.axis('off')
plt.show()