/* 
Title : Abortar Execução
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Como abortar a execução de um script
Options : 
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    //usuário virtual
    vus: 10,
    // duração do teste
    duration: '60s'
}

/*
A função setup() verifica se a URL[1] existe. Se por acaso a URL
não existe, então é executado "exec.test.abort" e a checagem
é interrompida.
1-https://test.k6.local/status
*/
export function setup() {
    let res = http.get('https://test.k6.local/status');
    if (res.error) {
        exec.test.abort('Aborting test. Application is DOWN');
    }
}

// simulação de um servidor que não responde a uma requisição
export default function () {
    http.get('https://test.k6.local/some-page');
    sleep(1);
}

/*
WARN[0000] Request Failed  error="Get \"https://test.k6.local/status\": lookup test.k6.local: no such host"

     █ setup

Run       [======================================] setup()
default   [--------------------------------------]
ERRO[0001] test aborted: Aborting test. Application is DOWN 
*/