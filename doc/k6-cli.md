/* 
Title : k6-cli
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Execução da ferramenta k6 através de linha de comando
Options : 
*/

### Executa teste com 1 vu e dura 10s
$ k6 run script.js --vus 1 --duration 10s

### Executa teste com 1 vu e dura 10s e termina após 1 iteração
$ k6 run script.js --vus 1 --duration 10s --iterations 1 

### Forma reduzida do comando anterior
$ k6 run script.js -u 1 -d 10s -i 1 

### Ignora a checagem do certificado, útil nos casos em que não há um certificado configurado.
$ k6 run script.js --insecure-skip-tls-verify

### Exporta um sumário da saída/resposta da requisição em formato .json (Sem detalhes)
$ k6 run script.js --summary-export=result.json

### Exporta uma saída detalhada de cada requisição feita (Com detalhes)
$ k6 run script.js --out json=full_result.json

#### Outras opções
- [How to use options](https://k6.io/docs/using-k6/k6-options/how-to/) 
- [Options reference](https://k6.io/docs/using-k6/k6-options/reference/) 