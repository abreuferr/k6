#######
Git
#######

- Cria nova branch e acessa ela
$ git checkout -b dev

- adiciona arquivo
$ git add .

- adiciona comentario
$ git commit -ma ¨bla bla bla¨

- vai para a branch main
$ git checkout main

- merge entre branch (main<>dev)
$ git merge dev

- apaga branch
$ git branch -D dev (--force)
$ git branch -d dev

#######
Cabeçalho (Modelo)
#######

/* 
Title : Credencials Check
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Este programa tem por objetivo o de exibir a quantidade de 
              credenciais que estão associados a um usuário.=
Options : 
*/

#######
Função
#######

- Função utilizada para obter as credenciais de acesso
getClientCredentials(clientAlias, client, device, users)
	url
	body
	params

	return { clientId, clientSecret }

- Função utilizada para obter o token de acesso
getAccessToken(clientId, clientSecret)
	url
	body
	params

	return { accessToken }

- Função utilizada para obter as credenciais de acesso
getAllCredentials(domain, username, accessToken)
	url
	body
	params

	return { credentials }

- Função utilizada para obter as políticas
getAllPolicies(domain, username, accessToken)
	url
	body
	params

	return { policies }