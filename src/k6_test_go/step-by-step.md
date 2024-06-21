/* 
Title : Etapas
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Passos feitos com o K6
Options : 
*/

1. Fazer uma requisição para registrar a wokstation e o usuário usando o token de ativação
2. Pegar o client_secret e client_id na resposta da requisição de registro
3. Gerar o bearer token com client_id e client_secret
4. Usar o client_id e client_secret para realizar uma requisição que retorna credenciais
5. Fazer requisição que trás apenas uma credencial
6. Fazer requisição que trás várias credenciais
7. Fazer 30 requisições com 10 usuários e 10 iterações