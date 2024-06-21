/*
Title : Using an external JSON file
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Cadastrar usuários
Options : https://k6.io/docs/javascript-api/jslib/utils/randomitem/
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';

export default function () {
    /*
    Primeira parte do programa - Cadastrar um usuário e senha
    */
   
    // Cria a variável "credentials" com as informações de usuário e senha
    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    }

    let res = http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    // Confirmando o cadastramento do usuário
    check(res, {
        'status is 201': (r) => r.status === 201
    });

    /*
    Segunda parte do programa - Obter o token do usuário que foi previamente cadastrado
    */

    // Enviando usuário e senha do usuário previamente cadastrado
    res = http.post(
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

    // Confirmando o cadastramento do usuário
    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });

    // A variável "accessToken" é criada e inserindo o valor do token
    const accessToken = res.json().access;
}