/* 
Title : HTTP Request
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Requisição HTTP
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

/* 
As chaves {} em volta do 'check' importa apenas a função check do módulo k6.
Usada para fazer verificações na resposta da requisição.
*/

import { check } from 'k6';

export default function () {
    // Realiza uma requisição GET para 'https://test.k6.io/' e armazena a resposta em 'res'.
    const res = http.get('https://test.k6.io/');

    // A função check é usada para verificar se uma condição é verdadeira ou falsa.
    // neste exemplo sempre irá retornar true.
    check(true, {
        
        // o value recebe o value de entrada 'true' e verifica se é igual a true.
        'true is true': (value) => value === true
    });
}
