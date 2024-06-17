/* Title : Breakpoint Test
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
Description : Testa a capacidade máxima de um sistema, 
aumentando gradualmente a carga para um valor alto até que 
o aplicativo comece a quebrar e tem uma duração bem maior, 
é necessário ser interrompido manualmente.
*/ Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
// importa biblioteca para esperar antes de executar a próxima requisição, isso ajuda a simular o comportamento de usuários reais.
import { sleep } from 'k6';

//configuração do teste de carga, estabelece a duração e define a quantidade de usuários virtuais.
// importante: não é indicado enviar grandes volumes de cargas para a API de teste do k6, é apenas um exemplo.
export const options = {
    stages: [
        {
            // duração do teste
            duration: '2h',
            // target = virtual users
            target: 1000
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