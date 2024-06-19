/*
Title : HTTP Get
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Obtendo registro, ${crocodileId} = 7, através da API do protocolo HTTP
Options : 
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    res = http.get('https://test-api.k6.io/public/crocodiles/7/');

    /*
    res = http.get('https://test-api.k6.io/public/crocodiles/6/');
     ✓ status is 200 ; existe o ${crocodileId} = 6
     ✗ Crocodile is Sobek ; o conteúdo da variável "name" não é "Sobek"
    */
   
    console.log(res.json().name);

    check(res, {
        // Verificar se o registro existe ${crocodileId}=7, se sim, retorna o código 200
        // ✓ status is 20
        'status is 200': (r) => r.status === 200,

        // Verifica se existe o registro ${crocodileId}=7 AND name==='Sobek' existe
        // ✓ Crocodile is Sobek
        'Crocodile is Sobek': (r) => r.json().name === 'Sobek'

    });

}