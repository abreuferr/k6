/* 
Title : Making HTTP Requests with K6
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Faz a verificação da existência ou não de uma URL durante um determinado tempo
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

// importa a biblioteca check e sleep do k6.
import { check, sleep } from 'k6';

export const options = {
    //quantidade usuário virtuais
    vus: 10,
    // duração do teste
    duration: '10s',
    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 100ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<100'],
        // a quantidade de falhas não pode ultrapassar 0.01 (1%)
        http_req_failed: ['rate<0.01']
    }
}

export default function () {
    const res = http.get('https://test.k6.io/');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    sleep(2);
}

/*
✗ http_req_duration..............: avg=159.97ms min=138.8ms  med=140.77ms max=279.78ms p(90)=275.8ms  p(95)=277.11ms

✓ http_req_failed................: 0.00%   ✓ 0 - https://test.k6.io/
✗ http_req_failed............: 100.00% ✓ 50       ✗ 0 - https://test.k6.io/foo
*/