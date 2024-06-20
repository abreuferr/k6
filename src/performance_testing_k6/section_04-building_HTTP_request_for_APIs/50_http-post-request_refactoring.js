/*
Title : Making a POST request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : 
Options : https://test-api.k6.io/
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

    // Construindo a variável "accessToken"
    const accessToken = res.json().access;

    // Exibição do token
    console.log(accessToken);
}

/*
INFO[0007] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4ODMxNjk4LCJqdGkiOiJlZDkxNjcyZjkzYmM0ZDM3YmNlZTcyYWRkY2Q3ZmFlYyIsInVzZXJfaWQiOjE5Mjg0ODd9.wn_oiQIpwL56ZZuxWCho4Zg49-tcsFQvbYp1sGA3tjM  source=console
*/