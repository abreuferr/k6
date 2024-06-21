/*
Title : Random item in an array function
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : geração de um registro em uma função de array
Options : https://k6.io/docs/javascript-api/jslib/utils/randomitem/
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileIds = crocodiles.map(item => item.id); // INFO[0001] [1,2,3,4,5,6,7,8] - ID de todos os registros
    const crocodileId = randomItem(crocodileIds); // INFO[0004] 2 - obteve o ID do registro de forma aleatória (randomItem)

    // INFO[0001] [1,2,3,4,5,6,7,8] - ID de todos os registros
    console.log(crocodileIds);

    // GET /public/crocodiles/1/ HTTP/1.1
    // INFO[0004] 1 - obteve o registro de forma aleatória (randomItem)
    console.log(crocodileId);

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile has the correct id': (r) => r.json().id === crocodileId
    });
}