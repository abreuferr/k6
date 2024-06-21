/*
Title : 57. Making a PUT request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Utilização de tokens para o processo de autenticação
Options : 
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    /*
    Primeira parte do programa - Cadastrar um usuário e senha
    */
   
    // Cria a variável "credentials" com as informações de usuário e senha
    // {"username":"test_1718915569120","password":"secret_1718915569120"}
    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

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

    // Cria a variável "accessToken" e inserindo o valor do token
    const accessToken = res.json().access;

    // Exibição do token
    // INFO[0004] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4OTE4MDU5LCJqdGkiOiI2MmNiY2U3MDc0ZDY0MDRhOTU5YTZmYzBiMDQ2YzVkMSIsInVzZXJfaWQiOjE5MzM0NjB9.MfNGuRu7ssi-LhSOQzFXv5rtkM_jWaLikOpDoDMzNFY
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

    /*
    Quarta parte do programa - cadastrando um novo crocodilo
    */

    // cadastrando um novo crocodilo
    res = http.post(
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

    /*
    Quinta parte do programa - exibe os dados do crocodilo
    */

    // Cria a variável de nome "newCrocodileId" com o ID do novo crocodilo
    const newCrocodileId = res.json().id;

    // Autenticação
    res = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    // Exibe os dados do novo crocodilo registrado
    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile id': (r) => r.json().id === newCrocodileId
    });

    /*
    Sexta parte do programa - atualizar os dados do crocodilo
    */

    // HTTP.PUT
    //{"id":13806739,"name":"Updated Random croc","sex":"M","date_of_birth":"1900-10-28","age":123}
    res = http.put(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: 'Updated Random croc',
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