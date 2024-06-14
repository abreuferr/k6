// Title : Groups 
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : 
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep, group, check } from 'k6';

// Constantes
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<8000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    }
}

// Main()
export default function () {
    // Grupo Main Page
    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=5000ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        // Grupo Assets (Sub Grupo)
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=1000ms');
        });
    });

    // Grupo New Page
    group('News page', function () {
        http.get('https://run.mocky.io/v3/1e885f08-e094-49c4-952b-b20c978e199f?mocky-delay=5000ms');
    });

    sleep(1);
}
