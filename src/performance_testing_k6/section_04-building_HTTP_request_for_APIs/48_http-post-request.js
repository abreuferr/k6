/*
Title : Making a POST request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
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

Postman - GET - https://test-api.k6.io/user/register/ - body - raw - text
{
    "username": "Test_171",
    "password": "Test_171"
}

- Send

{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODkxMzE4MSwianRpIjoiY2FiZDYxYmVmMGZkNGFhOWE4ZGJkZDYxOTg2NjNiMDMiLCJ1c2VyX2lkIjoxOTI4MTE2fQ.xFxo9j2MNaWv38ThxI1e0EODd1agJ8JZzYnkIUrx26Q",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODI3MDgxLCJqdGkiOiI4YTFiMjYwMjJhODI0YTAwODJmZGIzMDVhZWEwNDM0ZSIsInVzZXJfaWQiOjE5MjgxMTZ9.CxpnRm1URU8LGFxPrf7KdzBdizEgABUEcxmnjegQqxE"
}
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {

    // JSON.stringify = transformar a string em um JSON
    const body = JSON.stringify({
        // usuário previamente cadastrado no exercício "47_http-post.js"
        username: 'test_1718828341271',
        password: 'test'
    });

    // Enviando um cabeçalho
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // POST = URL, corpo e cabeçalho
    http.post('https://test-api.k6.io/auth/token/login/', body, params);

    // 
    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: 'test_1718828341271',
                password: 'test'
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const accessToken = res.json().access;
    console.log(accessToken);
}

/*
{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxODkxNDg1NCwianRpIjoiYzJmNGM3NDkzZjJmNDlkMjk4NjU0Mzc1NDk5NTA2NjkiLCJ1c2VyX2lkIjoxOTI4Mjg1fQ.TwdK-WCUWo5qxZHYgivAgvjjR5-_ZQ1c4vYfTUOZLZc","access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODI4NzU0LCJqdGkiOiI2YzYwZWI1NzYwYjg0YWU5ODQ2ZWU3NjIzZGRjM2Y5YiIsInVzZXJfaWQiOjE5MjgyODV9.4khasJIfetbGbDCOAq9FM_9mHhnlVSkT4RmdRR8EwVo"}  group= iter=0 request_id=6de91fbb-1b9a-47a4-478e-1e742c0ed1c6 scenario=default source=http-debug vu=1

INFO[0016] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODI4NzU0LCJqdGkiOiI2YzYwZWI1NzYwYjg0YWU5ODQ2ZWU3NjIzZGRjM2Y5YiIsInVzZXJfaWQiOjE5MjgyODV9.4khasJIfetbGbDCOAq9FM_9mHhnlVSkT4RmdRR8EwVo  source=console
*/
