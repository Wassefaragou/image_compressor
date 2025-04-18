import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt

# === Chargement des images ===
def load_images_from_folder(folder, target_size=(256, 256)):
    images = []
    for filename in os.listdir(folder):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            img = Image.open(os.path.join(folder, filename)).convert('RGB')
            img = img.resize(target_size)
            images.append(np.array(img) / 255.0)
    return np.array(images)

# === Construction du modèle U-Net Autoencoder ===
def build_unet_autoencoder(input_shape=(256, 256, 3)):
    inputs = layers.Input(shape=input_shape)

    # ENCODEUR
    c1 = layers.Conv2D(64, (3,3), activation='relu', padding='same')(inputs)
    p1 = layers.MaxPooling2D((2,2))(c1)

    c2 = layers.Conv2D(128, (3,3), activation='relu', padding='same')(p1)
    p2 = layers.MaxPooling2D((2,2))(c2)

    c3 = layers.Conv2D(256, (3,3), activation='relu', padding='same')(p2)
    p3 = layers.MaxPooling2D((2,2))(c3)

    c4 = layers.Conv2D(512, (3,3), activation='relu', padding='same')(p3)
    p4 = layers.MaxPooling2D((2,2))(c4)

    bn = layers.Conv2D(1024, (3,3), activation='relu', padding='same')(p4)

    # DÉCODEUR
    u1 = layers.UpSampling2D((2,2))(bn)
    u1 = layers.Concatenate()([u1, c4])
    c5 = layers.Conv2D(512, (3,3), activation='relu', padding='same')(u1)

    u2 = layers.UpSampling2D((2,2))(c5)
    u2 = layers.Concatenate()([u2, c3])
    c6 = layers.Conv2D(256, (3,3), activation='relu', padding='same')(u2)

    u3 = layers.UpSampling2D((2,2))(c6)
    u3 = layers.Concatenate()([u3, c2])
    c7 = layers.Conv2D(128, (3,3), activation='relu', padding='same')(u3)

    u4 = layers.UpSampling2D((2,2))(c7)
    u4 = layers.Concatenate()([u4, c1])
    c8 = layers.Conv2D(64, (3,3), activation='relu', padding='same')(u4)

    outputs = layers.Conv2D(3, (1,1), activation='sigmoid')(c8)

    autoencoder = models.Model(inputs, outputs)
    autoencoder.compile(optimizer=tf.keras.optimizers.Adam(1e-4), loss='binary_crossentropy')
    return autoencoder

# === Préparation ===
image_folder = './training_images'
input_size = (256, 256)
images = load_images_from_folder(image_folder, target_size=input_size)

# === Création et entraînement du modèle ===
autoencoder = build_unet_autoencoder(input_shape=(*input_size, 3))
autoencoder.summary()
autoencoder.fit(images, images, epochs=100, batch_size=8, validation_split=0.1)

# === Extraction encoder / decoder ===
encoder_input = autoencoder.input
encoder_output = autoencoder.get_layer(index=10).output  # couche du bottleneck
encoder = models.Model(inputs=encoder_input, outputs=encoder_output, name="encoder")

encoded_input = layers.Input(shape=encoder_output.shape[1:])
x = encoded_input
for layer in autoencoder.layers[11:]:
    x = layer(x)
decoder = models.Model(inputs=encoded_input, outputs=x, name="decoder")

# === Sauvegarde des modèles ===
os.makedirs('./models', exist_ok=True)
encoder.save('./models/encoder_model.keras')
decoder.save('./models/decoder_model.keras')
autoencoder.save('./models/autoencoder_model.keras')