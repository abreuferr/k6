/* 
Title : Groups 
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : 
Options : 
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep, group, check } from 'k6';

// Condições para que o teste possa ser executado de forma satisfatória
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

        // Sub-Grupo Assets
        group('Assets', function (){
            // requisição de acesso para o restante da página web, CSS e JS
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

/*
     █ Main page
       ✓ status is 200
       █ Assets
     █ News page
*/