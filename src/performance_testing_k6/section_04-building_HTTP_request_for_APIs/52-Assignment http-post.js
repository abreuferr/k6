/*
Title :  Assignment - Create a new resource using POST
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Utilização de tokens para o processo de autenticação
Options : https://www.youtube.com/watch?v=GhrvZ5nUWNg
          https://test-api.k6.io/my/crocodiles/
*/

/*
# Obter o token de acesso
#
# Postman - GET - https://test-api.k6.io/user/register/ - body - raw - JSON
{
    "username": "test_1718891539418",
    "password": "secret"
}

- Send

{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4OTA2NjQ0LCJqdGkiOiJkZWIzZjE2YWM1ZjY0YzI5OGE2YjY1MDRhZDg4NGY0NCIsInVzZXJfaWQiOjE5MzE5OTl9.X7y0_BBLDzZEOxWr7LyZoXOzK9VqWl9w70Zi7Hx9_JA"
}

# Cadastrar um novo crocodilo
#
# Postman - POST - https://test-api.k6.io/my/crocodiles/ - authorization - Auth Type: Bearer Token - Token : <ACCESS>

{
    "name": [
        "This field is required."
    ],
    "sex": [
        "This field is required."
    ],
    "date_of_birth": [
        "This field is required."
    ]
}

# Cadastrar um novo crocodilo
#
# Postman - POST - https://test-api.k6.io/my/crocodiles/ - body - raw - JSON

{
    "name": "random croc",
    "sex": "M",
    "date_of_birth": "1900-10-28"
}

- SEND

{
    "id": 13806083,
    "name": "random croc",
    "sex": "M",
    "date_of_birth": "1900-10-28",
    "age": 123
}

# Exibir o crocodilo cadastrado anteriormente
#
# Postman - GET - https://test-api.k6.io/user/register/ - authorization - Auth Type: Bearer Token - Token : <ACCESS>

- SEND

[
    {
        "id": 13806083,
        "name": "random croc",
        "sex": "M",
        "date_of_birth": "1900-10-28",
        "age": 123
    }
]
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    /*
    Primeira parte do programa - Cadastrar um usuário e senha
    */

    /*
    Armazenando usuário e senha na variável "credentials"
    A variável "credentials" será utilizada posteriormente
    para obter o token.
    */
    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    // Cadastrando usuário e senha
    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    /*
    Segunda parte do programa - Obter o token do usuário que foi previamente cadastrado
    */

    // Enviando usuário e senha do usuário previamente cadastrado
    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    // Construindo a variável "accessToken" e inserindo o valor do token
    const accessToken = res.json().access;

    // Exibição do token
    console.log(accessToken);

    /*
    Terceira parte do programa - executando o processo de login com o token obtido anteriormente
    */

    // Enviando o token para autenticação
    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );
}