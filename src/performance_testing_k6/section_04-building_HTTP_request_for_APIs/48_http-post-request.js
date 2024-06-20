/*
Title : Assignment - Making a POST request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Obter o token de acesso do usuário
Options : https://test-api.k6.io/auth/token/login/
*/

/*
# Postman - GET - https://test-api.k6.io/user/register/ - send

{
    "username": [
        "This field is required."
    ],
    "password": [
        "This field is required."
    ]
}

# Postman - GET - https://test-api.k6.io/user/register/ - body - raw - JSON
{
    "username": "test_1718891539418",
    "password": "secret"
}

- Send

{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODk3ODYyMSwianRpIjoiMjVmOTY4OTVjMzE5NDdmYzhkNjJmY2E1YWY2MTcxMmMiLCJ1c2VyX2lkIjoxOTMxOTk5fQ.1EavHGD4Fw1g-JHJT7wnJz3hl8kk-k-gB1UgRHF4x5o",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODkyNTIxLCJqdGkiOiI5ZDE5NGY5ZDcwZGY0NDU0YmI5MWRhYjFkOTM3YTlmNiIsInVzZXJfaWQiOjE5MzE5OTl9.SqCetQ6LPK5w_th4Eb4eSG_ZKOeb8fcznEu3wbtb1Ns"
}*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    /*
    Primeira parte do programa

    Criar os parâmetros BODY e PARAMS para a segunda parte
    do programa
    */

    // JSON.stringify = transformar a string em um JSON
    const body = JSON.stringify({
        // usuário previamente cadastrado no exercício "47_http-post.js"
        username: 'test_1718891539418',
        password: 'secret'
    });

    // Enviando um cabeçalho
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    /*
    Segunda parte do programa

    Executar o comando POST para obter o token
    */

    // POST = URL, corpo(body) e cabeçalho(params)
    http.post('https://test-api.k6.io/auth/token/login/', body, params);

    // 
    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: 'test_1718891539418',
                password: 'secret'
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    // Exibição do token
    const accessToken = res.json().access;
    console.log(accessToken);
}

/*
{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODkxNDg1NCwianRpIjoiYzJmNGM3NDkzZjJmNDlkMjk4NjU0Mzc1NDk5NTA2NjkiLCJ1c2VyX2lkIjoxOTI4Mjg1fQ.TwdK-WCUWo5qxZHYgivAgvjjR5-_ZQ1c4vYfTUOZLZc","access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODI4NzU0LCJqdGkiOiI2YzYwZWI1NzYwYjg0YWU5ODQ2ZWU3NjIzZGRjM2Y5YiIsInVzZXJfaWQiOjE5MjgyODV9.4khasJIfetbGbDCOAq9FM_9mHhnlVSkT4RmdRR8EwVo"}  group= iter=0 request_id=6de91fbb-1b9a-47a4-478e-1e742c0ed1c6 scenario=default source=http-debug vu=1

INFO[0016] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODI4NzU0LCJqdGkiOiI2YzYwZWI1NzYwYjg0YWU5ODQ2ZWU3NjIzZGRjM2Y5YiIsInVzZXJfaWQiOjE5MjgyODV9.4khasJIfetbGbDCOAq9FM_9mHhnlVSkT4RmdRR8EwVo  source=console
*/
