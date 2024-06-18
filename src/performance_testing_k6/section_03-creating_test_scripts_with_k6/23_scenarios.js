/* 
Title : Making HTTP Requests with K6
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Faz a verificação da existência ou não de uma URL
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

// importa a biblioteca check do k6.
import { check } from 'k6';

export default function () {
    const res = http.get('https://test.k6.io/');
    check(res, {
        // 'true is true': (value) => value == true
        'status is true (200)': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
}