/* 
Title : Groups 
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : 
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<350']
    }
}

export default function () {

    // Grupo Main Page
    group('Main page', function () {
        let res = http.get('https://test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });

        // Sub-Grupo
        group('Assets', function (){
            // requisição de acesso para o restante da págian web, CSS e JS
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/css/prims.js');  
        });
    });

    // Grupo New Page
    group('News page', function () {    
        // requisição de acesso a uma página PHP
        http.get('https://test.k6.io/news.php'); 
    });

    sleep(1);
}