import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt

def load_images_from_folder(folder, target_size=(256, 256)):
    images = []
    for filename in os.listdir(folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img = Image.open(os.path.join(folder, filename)).convert('RGB')
            img_resized = img.resize(target_size)
            images.append(np.array(img_resized) / 255.0)
    return np.array(images)

def build_light_autoencoder(input_shape):
    input_img = layers.Input(shape=input_shape)

    # ENCODEUR allégé
    x = layers.Conv2D(32, (3,3), activation='relu', padding='same')(input_img)
    x = layers.MaxPooling2D((2,2), padding='same')(x)
    x = layers.Conv2D(64, (3,3), activation='relu', padding='same')(x)
    x = layers.MaxPooling2D((2,2), padding='same')(x)
    x = layers.Conv2D(32, (3,3), activation='relu', padding='same')(x)
    x = layers.MaxPooling2D((2,2), padding='same')(x)
    encoded = layers.MaxPooling2D((2,2), padding='same', name='encoded_layer')(x)  # Ajout d'un 4e maxpool

    # DÉCODEUR
    encoded_input = layers.Input(shape=encoded.shape[1:])
    x = layers.Conv2DTranspose(32, (3,3), activation='relu', padding='same')(encoded_input)
    x = layers.UpSampling2D((2,2))(x)
    x = layers.Conv2DTranspose(64, (3,3), activation='relu', padding='same')(x)
    x = layers.UpSampling2D((2,2))(x)
    x = layers.Conv2DTranspose(32, (3,3), activation='relu', padding='same')(x)
    x = layers.UpSampling2D((2,2))(x)
    x = layers.UpSampling2D((2,2))(x)  # Ajout pour annuler le 4e MaxPooling
    decoded_output = layers.Conv2D(3, (3,3), activation='sigmoid', padding='same')(x)

    encoder = models.Model(input_img, encoded, name="encoder")
    decoder = models.Model(encoded_input, decoded_output, name="decoder")
    autoencoder = models.Model(input_img, decoder(encoder(input_img)), name="autoencoder")

    autoencoder.compile(optimizer='adam', loss='binary_crossentropy')
    return autoencoder, encoder, decoder

# Entraînement
image_folder = './training_images'
fixed_size = (256, 256)
images_array = load_images_from_folder(image_folder, target_size=fixed_size)

autoencoder, encoder, decoder = build_light_autoencoder((*fixed_size, 3))
autoencoder.summary()

autoencoder.fit(images_array, images_array, epochs=200, batch_size=45, validation_split=0.3, shuffle=True)

# === Sauvegarde ===
os.makedirs('./models', exist_ok=True)
encoder.save('./models/encoder_model.keras')
decoder.save('./models/decoder_model.keras')
autoencoder.save('./models/autoencoder_model.keras')

