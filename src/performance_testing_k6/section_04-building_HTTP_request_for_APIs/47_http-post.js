/*
Title : Making a POST request
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : 
Options : https://test-api.k6.io/
*/

/*
Postman - GET - https://test-api.k6.io/user/register/ - send

{
    "username": [
        "This field is required."
    ],
    "password": [
        "This field is required."
    ]
}

Postman - GET - https://test-api.k6.io/user/register/ - body - raw - json
{
    "username": "Test_171",
    "password": "Test_171"
}

- Send

{
    "username": "Test_171",
    "first_name": "",
    "last_name": "",
    "email": ""
}
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {

    // JSON.stringify = transformar a string em um JSON
    const body = JSON.stringify({
        // propriedade do objeto
        username: 'test_' + Date.now(),
        password: 'test'
    });

    // Enviando um cabeçalho
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // POST = URL, corpo e cabeçalho
    http.post('https://test-api.k6.io/user/register/', body, params);

    /*
    # Adicionando um novo usuário no banco de dados

    INFO[0009] Response:
    HTTP/1.1 201 Created

    {"username":"test_12345678901234561718826180454","first_name":"","last_name":"","email":""}  group= iter=0 request_id=5d0f4245-f29c-44c8-5d8f-996fb5f553c9 scenario=default source=http-debug vu=1

    # Quando o usuário já existe no banco de dados

    INFO[0001] Response:
    HTTP/1.1 400 Bad Request
    
    {"username":["A user with that username already exists."]}  group= iter=0 request_id=f69cdb7c-1744-46cb-6e64-a6826dd0ff25 scenario=default source=http-debug vu=1
    */
}