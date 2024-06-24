/*
Title : Making a DELETE request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : apagar registro
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

    // A variável "accessToken" é criada e inserindo o valor do token
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
    /*
    Sétima parte do programa - atualizar PARCIAL dos dados do crocodilo
    */

    // HTTP.PATCH
    // {"id":13806814,"name":"Updated Random croc","sex":"F","date_of_birth":"1900-10-28","age":123}
    res = http.patch(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                sex: 'F'
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
    Oitava parte do programa - apagando registro
    */

    /*
    HTTP.DELETE
    INFO[0015] Request:
    DELETE /my/crocodiles/13806841/ HTTP/1.1
    */
    res = http.del(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );
}