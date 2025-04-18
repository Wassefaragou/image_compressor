import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import MinMaxScaler


np.random.seed(42)
data = {
    'feature1': np.random.rand(100),
    'feature2': np.random.rand(100),
    'feature3': np.random.rand(100),
    'feature4': np.random.rand(100)
}
df = pd.DataFrame(data)
print("Original DataFrame:\n", df.head())


scaler = MinMaxScaler()
df_scaled = scaler.fit_transform(df)

# Convert DataFrame to PyTorch Tensor
df_tensor = torch.tensor(df_scaled, dtype=torch.float32)


class Autoencoder(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super(Autoencoder, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 8),  # Extra layer for better compression
            nn.ReLU(),
            nn.Linear(8, hidden_dim),
            nn.ReLU()
        )
        self.decoder = nn.Sequential(
            nn.Linear(hidden_dim, 8),
            nn.ReLU(),
            nn.Linear(8, input_dim),
            nn.Sigmoid()  # Output in range [0,1]
        )

    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded


input_dim = df.shape[1]  # Number of features (4)
hidden_dim = 4  # Increased from 2 → 4
autoencoder = Autoencoder(input_dim, hidden_dim)
criterion = nn.MSELoss()  # Mean Squared Error Loss
optimizer = optim.Adam(autoencoder.parameters(), lr=0.01)


num_epochs = 5000  # Increased training epochs
for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = autoencoder(df_tensor)  # Forward pass
    loss = criterion(outputs, df_tensor)  # Compute reconstruction loss
    loss.backward()  # Backpropagation
    optimizer.step()  # Update weights

    if epoch % 500 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.6f}')


with torch.no_grad():
    compressed_data = autoencoder.encoder(df_tensor).numpy()

# Convert to DataFrame
compressed_df = pd.DataFrame(compressed_data, columns=[f'latent{i+1}' for i in range(hidden_dim)])
print("\nCompressed Data (Latent Representation):\n", compressed_df.head())


with torch.no_grad():
    reconstructed_data = autoencoder(df_tensor).numpy()


reconstructed_df = pd.DataFrame(scaler.inverse_transform(reconstructed_data), columns=df.columns)
print("\nReconstructed Data (Denormalized):\n", reconstructed_df.head())


mse = np.mean((df_scaled - reconstructed_data) ** 2)
print(f"\nReconstruction MSE: {mse:.6f}")