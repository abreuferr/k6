// Title : Custom Tags
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : 
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<3000'],
        http_errors: ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}':['rate>=0.99']
    }
}

// métrica customizada
let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/aa20999a-7ab3-4fab-949d-ece1dedb07c2');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get('https://run.mocky.io/v3/e1dbb6f2-0daf-4e13-8db9-e5dd521bf99c?mocky-delay=2000ms',
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