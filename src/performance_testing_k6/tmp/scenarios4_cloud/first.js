/*
Importante: para executar o script na cloud é necessário usar "cloud" em vez de "run" na execução.

Exemplo:
Localmente: 
$ k6 run script.js

Cloud: 
$ k6 cloud script.js

Enviar os dados dos testes locais para a nuvem (consome recursos da nuvem da conta free, usar apenas quando for necessário.)
$ k6 run script.js -o cloud

Sempre testar localmente antes de executar na nuvem.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
    /*
    Adicionar extensão para o projeto na nuvem
     */
    ext: {
        loadimpact: {
            projectID: 41654695  //id apenas de exemplo
        } 

    }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}