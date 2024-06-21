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
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<800'],
        'group_duration{group:::Main page::Assets}': ['p(95)<800'],
    }
}

export default function () {
    // Grupo Main Page
    group('Main page', function () {
        let res = http.get('https://test.k6.io/');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        // Sub-Grupo Assets
        group('Assets', function () {
            // requisição de acesso para o restante da página web, CSS e JS
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
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

     group_duration....................: avg=386.17ms min=144.15ms med=288.7ms  max=725.65ms p(90)=638.26ms p(95)=681.96ms
     ✓ { group:::Main page::Assets }...: avg=288.7ms  min=288.7ms  med=288.7ms  max=288.7ms  p(90)=288.7ms  p(95)=288.7ms 
     ✓ { group:::Main page }...........: avg=725.65ms min=725.65ms med=725.65ms max=725.65ms p(90)=725.65ms p(95)=725.65ms
   ✓ http_req_duration.................: avg=144.17ms min=143.95ms med=144.1ms  max=144.54ms p(90)=144.41ms p(95)=144.47ms
       { expected_response:true }......: avg=144.17ms min=143.95ms med=144.1ms  max=144.54ms p(90)=144.41ms p(95)=144.47ms
*/