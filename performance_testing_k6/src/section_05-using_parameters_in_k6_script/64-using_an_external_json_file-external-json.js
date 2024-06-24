/*
Title : Using an external JSON file
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Obter o token de um dos usuários presentes em um arquivo, "64-users.json" e
              previamente cadastrados.
Options : https://k6.io/docs/javascript-api/jslib/utils/randomitem/
*/

// importando a bibliotecas do k6.
import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

/* 
Matriz compartilhada. A matriz é compartilhada com todos os usuários virtuais. Essa
matriz é compartilhada com todos os usuários.
Essa tecnologia é utilizada para evitar problema de memória.
*/

// Dados obtidos do arquivo "64-users.json" e armazenados no array "userCredentials"
const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./64-users.json')).users;
});

export default function () {

    const randomCredential = randomItem(userCredentials);

    /*
    Obter o token do usuário que foi previamente cadastrado
    */

    // Enviando usuário e senha do usuário previamente cadastrado
    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredential.username,
                password: randomCredential.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });
    
    const accessToken = res.json().access;
}

/*
{"username":"test_rdsdvgou","password":"secret_vfpcrnck"}

{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxOTA3OTAwMSwianRpIjoiMTg3YmUzZTAwYjYwNDExZGFiNjVhNmFmZDZkOThiZWEiLCJ1c2VyX2lkIjo3MjU3NDR9.exR_pT2yyTtlSyzxVLIBsUsfM4kmLsJzIY04fOkWAXk","access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4OTkyOTAxLCJqdGkiOiIyMTA5ZjU1NDYyZTQ0Mzk0OTk2NGI3Nzg1NWRiNWQ5MyIsInVzZXJfaWQiOjcyNTc0NH0.F_gRB5VG-4LPpJ8klTqiYzRpS5vjchjhcYJC9mQ6fNs"}

     ✓ status is 200
     ✓ has access token
*/