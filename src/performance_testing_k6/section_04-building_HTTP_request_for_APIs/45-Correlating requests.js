/*
Title : Correlating Request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : 
Options : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // enviando solicitação de acesso a API
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    // Definindo valores para as variáveis/constantes
    const crocodiles = res.json();
    
    //console.log(crocodiles[0]); // INFO[0001] {"date_of_birth":"2010-06-27","age":13,"id":1,"name":"Bert","sex":"M"}  source=console
    //console.log(crocodiles[0].id); // INFO[0001] 1      source=console ; INFO[0001] Sobek      source=console

    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    //const crocodileId = 7
    /*
    {"id":7,"name":"Sobek","sex":"F","date_of_birth":"1854-09-02","age":169}  group= iter=0 request_id=eb4f858d-9735-40b8-66a9-4467ddc57148 scenario=default source=http-debug vu=1
    INFO[0001] Sobek                                         source=console
    */
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    //console.log(res.json().name);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile is ${crocodileName}': (r) => r.json().name === crocodileName
        //'Crocodile name ': (r) => r.json().name === 'Sobek'
    });
}