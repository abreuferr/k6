/* 
Title : Custom Tags
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Possibilidade de criar tags customizadas
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<350'],
        'http_req_duration{page:order}': ['p(95)<350'],
        http_errors: ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}':['rate>=0.99']
    }
}

// métrica customizada
let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/8e6423ec-6fdc-424c-960b-2b5d54748a14');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get('https://run.mocky.io/v3/1e7a841b-3522-49f4-bac0-27090ddbf47c?mocky-delay=100ms',
    {
        tags: {
            page: 'order'
        }
    }
    );

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res,{'status is 201': (r) => r.status === 20 }, {page: 'order'});

    sleep(1);
}

/*
   ✓ http_req_duration..............: avg=268.89ms min=220.08ms med=268.89ms max=317.7ms  p(90)=307.94ms p(95)=312.82ms
       { expected_response:true }...: avg=268.89ms min=220.08ms med=268.89ms max=317.7ms  p(90)=307.94ms p(95)=312.82ms
     ✓ { page:order }...............: avg=317.7ms  min=317.7ms  med=317.7ms  max=317.7ms  p(90)=317.7ms  p(95)=317.7ms 
*/