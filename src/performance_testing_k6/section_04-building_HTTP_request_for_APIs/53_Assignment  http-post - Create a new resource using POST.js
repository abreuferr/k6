/*
Title :  Assignment - Create a new resource using POST
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Utilização de tokens para o processo de autenticação
Options : https://www.youtube.com/watch?v=GhrvZ5nUWNg
          https://test-api.k6.io/my/crocodiles/
*/
// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    /*
    Primeira parte do programa - Cadastrar um usuário e senha
    */
    // Variavel "credentials"
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
    //console.log(accessToken);

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

    /*
    Quarta parte do programa - cadastrando um novo crocodilo
    */

    // cadastrando um novo crocodilo
    http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );
}