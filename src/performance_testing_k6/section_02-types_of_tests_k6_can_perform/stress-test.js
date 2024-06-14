// Title : Stress Test
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : Leva o sistema ao seu ponto de ruptura. Avalia o desempenho do sistema com cargas acima do normal.
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
// importa biblioteca para esperar antes de executar a próxima requisição, isso ajuda a simular o comportamento de usuários reais.
import { sleep } from 'k6';

/*
1. a primeira fase, aumenta gradualmente o número de usuários de 0 para 10.000 ao longo de 10 segundos.
2. a segunda fase,  mantém constante o número de usuários em 10.000 por 30 segundos.
3. a terceira fase,  reduz gradualmente o número de usuários de 10.000 para 0 ao longo de 10 segundos.
*/
export const options = {
    stages: [
        {
            duration: '10s',
            target: 10000
        },
        {
            duration: '30s',
            target: 10000
        },
        {
            duration: '10s',
            target: 0
        }
    ]
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