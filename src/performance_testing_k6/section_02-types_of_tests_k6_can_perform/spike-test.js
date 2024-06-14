// Title : Spike Test
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : Aumenta e diminuí repentinamente a carga no sistema. 
//              Útil para identificar cenários em que o sistema tem um aumento repentino, além do tráfego normal. 
//              Avalia a capacidade do sistema de lidar com aumentos inesperados e como ele se recupera.
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
// importa biblioteca para esperar antes de executar a próxima requisição, isso ajuda a simular o comportamento de usuários reais.
import { sleep } from 'k6';

// configurações do teste, inicia com um número alto de usuário e diminui repentinamente em uma duração curta de tempo.
export const options = {
    stages: [
        {
            // duração do teste
            duration: '2m',
            // target = virtual users
            target: 1000
        },
        {
            // duração do teste
            duration: '1m',
            // target = virtual users
            target: 0
        }
    ]
}

// realiza requisições GET e espera por alguns segundos para fazer a próxima requisição.
export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}