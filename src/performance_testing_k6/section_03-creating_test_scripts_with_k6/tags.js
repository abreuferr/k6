// Title : Tags
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : 
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
// doc: "https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/"

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

export const options = {

    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/aa20999a-7ab3-4fab-949d-ece1dedb07c2'); 
    http.get('https://run.mocky.io/v3/e1dbb6f2-0daf-4e13-8db9-e5dd521bf99c?mocky-delay=2000ms'); 
}
