import socket

# Server configuration
server_host = '127.0.0.1'  # Server's IP address
server_port = 12345  # Port to connect to
received_file_path = 'edi.edi'  # File to save

# Create a socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((server_host, server_port))

# Receive and save the file
with open(received_file_path, 'wb') as file:
    data = client_socket.recv(1024)
    while data:
        file.write(data)
        data = client_socket.recv(1024)

print(f"File received and saved as {received_file_path}")
client_socket.close()
