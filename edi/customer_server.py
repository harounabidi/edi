import socket
import psycopg2

# Replace with your database connection details
db_params = {
    'dbname': 'edi',
    'user': 'mac',
    'password': '',
    'host': 'localhost',  # or the host where your PostgreSQL server is running
    'port': '5432',       # default PostgreSQL port
}

# Establish a connection to the database
conn = psycopg2.connect(**db_params)
cur = conn.cursor()

# Server configuration
host = '127.0.0.1'  # Server's IP address
port = 12345  # Port to listen on

# Create a socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((host, port))
server_socket.listen(1)

print(f"Server is listening on {host}:{port}")

while True:
    # Accept incoming connections
    client_socket, client_address = server_socket.accept()
    print(f"Connection from {client_address}")

    # Query the database for files with status 'new'
    cur.execute('SELECT id, name FROM public."EDI_File" WHERE status = \'NEW\'')
    files_to_send = cur.fetchall()

    for file_id, name in files_to_send:
        # Open the file and send it to the client
        file_path = str(name) + '.edi'

        with open(file_path, 'rb') as file:
            data = file.read(1024)
            while data:
                client_socket.send(data)
                data = file.read(1024)

        # Update the status to 'sent' in the database
        cur.execute('UPDATE public."EDI_File" SET status = %s WHERE id = %s', ('SENT', file_id))
        conn.commit()
        print(f"File {file_path} sent successfully")

    client_socket.close()

# Close the cursor and the database connection when done (in case the server stops)
cur.close()
conn.close()
