// Title : Smoke Test
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : Testa se o script escrito funciona de acordo com o esperado, como pouca duração e usuários. 
//               Deve ser realizado antes de testes mais aprofundados.
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
// importa biblioteca para esperar antes de executar a próxima requisição, isso ajuda a simular o comportamento de usuários reais.
import { sleep } from 'k6';

// configurações do teste, define a quantidade de usuários e a duração.
export const options = {
    // número de usuários (virtual users)
    vus: 1,
    // duração do teste
    duration: '10s'
}

// realiza requisições GET e espera por alguns segundos para fazer a próxima requisição.
export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}

// vus: 1,
// http_req_duration..............: avg=138.37ms min=137.56ms med=138.04ms max=140.04ms p(90)=139.33ms p(95)=139.69ms
// vus: 5,
// http_req_duration..............: avg=143.82ms min=140.11ms med=143.06ms max=152.09ms p(90)=146.86ms p(95)=148.71ms