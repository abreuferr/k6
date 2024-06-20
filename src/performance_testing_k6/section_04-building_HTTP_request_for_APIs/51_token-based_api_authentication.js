/*
Title :  Token-based API Authentication
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Utilização de tokens para o processo de autenticação
Options : https://www.youtube.com/watch?v=GhrvZ5nUWNg
          https://test-api.k6.io/my/crocodiles/
*/

/*
# Postman - GET - https://test-api.k6.io/user/register/ - body - raw - JSON
{
    "username": "test_1718891539418",
    "password": "secret"
}

- Send

{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODk3ODYyMSwianRpIjoiMjVmOTY4OTVjMzE5NDdmYzhkNjJmY2E1YWY2MTcxMmMiLCJ1c2VyX2lkIjoxOTMxOTk5fQ.1EavHGD4Fw1g-JHJT7wnJz3hl8kk-k-gB1UgRHF4x5o",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODkyNTIxLCJqdGkiOiI5ZDE5NGY5ZDcwZGY0NDU0YmI5MWRhYjFkOTM3YTlmNiIsInVzZXJfaWQiOjE5MzE5OTl9.SqCetQ6LPK5w_th4Eb4eSG_ZKOeb8fcznEu3wbtb1Ns"
}

# Postman - GET - https://test-api.k6.io/my/crocodiles/ - authorization - Auth Type: Bearer Token - Token : <ACCESS>
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

/*
INFO[0012] Request:
GET /my/crocodiles/ HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODk2NDkzLCJqdGkiOiJiNjA4NDg2ZDJiNzQ0ZWUzYjc2NTE2ZDNiOGM5OTQxZSIsInVzZXJfaWQiOjE5MzIyNjB9.qgBB1KsS3gRBgBCBOZagrr6a0a0fftfM_o3ID03oCvs

INFO[0013] Response:
HTTP/1.1 200 OK
*/