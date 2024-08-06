import hashlib
import base64
import json

def split_file(file_path, chunk_size_kb=700):
    chunk_size = chunk_size_kb * 1024  # Convertendo KB para Bytes
    json_data = []

    with open(file_path, 'rb') as file:
        chunk_index = 1  # Iniciando de 1 para os índices das partes dos arquivos
        while True:
            chunk = file.read(chunk_size)
            if not chunk:
                break

            # Calcular MD5
            md5_hash = hashlib.md5(chunk).hexdigest()

            # Codificar para base64
            base64_encoded_content = base64.b64encode(chunk).decode('utf-8')

            # Dados para JSON
            json_data.append({
                "file_chunk": chunk_index,
                "content": base64_encoded_content,
                "md5": md5_hash,
                "client_alias": "go-windows",
                "ip": "::1",
                "domain": "epmDevice",
                "username": "epmUser1"
            })

            chunk_index += 1

    # Escrevendo os dados para um arquivo JSON
    with open(file_path + '-info.json', 'w') as json_file:
        json.dump(json_data, json_file, indent=2)

split_file("/home/jnascimento/git-lab/benchmark-senhasegura-go/k6_test_go/src/Session/64cebee3-fa22-4ce0-b085-3e34ad1b4bba.guac")
