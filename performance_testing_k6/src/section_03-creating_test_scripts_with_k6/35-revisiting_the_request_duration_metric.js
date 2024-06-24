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
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'],
        'group_duration{group:::Main page}': ['p(95)<3000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],
        'group_duration{group:::News page}': ['p(95)<1000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=900ms');
        });
    });

    group('News page', function () {
        http.get('https://run.mocky.io/v3/1495fd78-c199-4a4c-aca2-cb1f159097bf');
    });

    sleep(1);
}

/*
     █ Main page

       ✗ status is 200
        ↳  0% — ✓ 0 / ✗ 1

       █ Assets

     █ News page

     group_duration....................: avg=1.76s    min=211.21ms med=2.22s    max=2.85s    p(90)=2.73s    p(95)=2.79s   
     ✗ { group:::Main page::Assets }...: avg=2.22s    min=2.22s    med=2.22s    max=2.22s    p(90)=2.22s    p(95)=2.22s   
     ✓ { group:::Main page }...........: avg=2.85s    min=2.85s    med=2.85s    max=2.85s    p(90)=2.85s    p(95)=2.85s   
     ✓ { group:::News page }...........: avg=211.21ms min=211.21ms med=211.21ms max=211.21ms p(90)=211.21ms p(95)=211.21ms
   ✗ http_req_duration.................: avg=661.51ms min=211.03ms med=661.47ms max=1.11s    p(90)=1.11s    p(95)=1.11s   
     ✓ { expected_response:true }......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
ERRO[0005] thresholds on metrics 'group_duration{group:::Main page::Assets}, http_req_duration' have been crossed 
*/