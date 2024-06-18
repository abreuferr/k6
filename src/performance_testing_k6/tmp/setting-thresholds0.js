/* 
Title : Thresholds
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Teste básico, existência de uma URL e um conteúdo
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
    //quantidade usuário virtuais
    vus: 1,

    // duração do teste
    duration: '1s',
}

export default function () {
    // realiza requisições GET e realiza duas verificações na resposta.
    const res = http.get('https://test.k6.io/');
        check(res, {
            // Verifica se a URL https://test.k6.io existe (200)
            'status is 200': (r) => r.status === 200,

            // Verifica se a string "Collection of simple web-pages" esta presente na URL https://test.k6.io/
            'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    sleep(2);
}

// ✓ status is 200
// ✓ page is startpage