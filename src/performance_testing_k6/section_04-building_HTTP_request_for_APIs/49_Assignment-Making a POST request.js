/*
Title : Assignment - Making a POST request - Solution
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : 
Options : https://test-api.k6.io/auth/token/login/
*/

import http from 'k6/http';
import { check } from 'k6';

export default function () {
    /*
    Primeira parte do programa

    Criar os parâmetros BODY e PARAMS para a segunda parte
    do programa
    */

    // Construindo a variável BODY
    const body = JSON.stringify({
        username: 'test_' + Date.now(),
        password: 'secret'
    });

    // Construindo a variável PARAMS
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Cadastrar usuário e senha
    http.post('https://test-api.k6.io/user/register/', body, params);

    /*
    Segunda parte do programa

    Executar o comando POST para obter o token
    */

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: 'test_1718893561282',
                password: 'secret'
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    // Construindo a variável "accessToken"
    const accessToken = res.json().access;

    // Exibição do token
    console.log(accessToken);
}

/*
INFO[0011] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODkzNTAwLCJqdGkiOiI0MmZjMDI3NTgzODg0ZTc4YjhhYTE5ZmJhNjZiYmI5YSIsInVzZXJfaWQiOjE5MzE5OTl9.3RbK5b6p9Gs9cwv6gobox9xvGifTZzPTHNenKnw6csY  source=console
*/