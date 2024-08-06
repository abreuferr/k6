import json
import base64

# Caminho do arquivo JSON
file_path = './k6_test_go/src/Description/arquivo.json'  # Certifique-se de que o caminho está correto

try:
    # Lê o JSON a partir de um arquivo
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Convertendo o dicionário Python em uma string JSON
    json_string = json.dumps(data)

    # Codificando a string JSON em Base64
    encoded_bytes = base64.b64encode(json_string.encode('utf-8'))
    encoded_string = encoded_bytes.decode('utf-8')

    # Mostrando o resultado codificado
    print("Encoded JSON in Base64:")
    print(encoded_string)

except IOError:
    print(f"Error: File not found at {file_path}")
except json.JSONDecodeError:
    print("Error: File is not a valid JSON")