# Como obter o client_id e o client_secret

## Passo a passo no cofre
1. Acesse o cofre
2. Navegue até **Go Endpoint Manager > Configurações > Parâmetros > New GO Endpoint Manager**
3. Na seção **Configurações de instalação**, copie o valor abaixo de **Token do cofre**

## Passo a passo no Postman
1. Acesse o Postman
2. Navegue até **Workspaces > Create Workspace > Blank Workspace**, e clique em **Next**.
3. Preencha o campo **Name** com o nome da **API senhasegura**
4. Na opção **Who can access your workspace?** selecione **Only me**
5. Clique em **Create**
6. Clique em **Import** e selecione o arquivo **.JSON**

### Postman configuração - (Parte 1)
1. Clique em **Client Manager API** e vá até a aba **Variables**
2. Altere o valor do campo **pedm_api_base_url** e **base_url** com o endereço IP do seu cofre
3. Clique no campo vazio **Add new Variable**
4. Preencha **Variable** com **bootstrap_token** e **Initial value** com o **Token do cofre**
5. Clique em **Save**

### Postman configuração - (Parte 2)
1. Volte à coleção **Client Manager API**
2. Clique na requisição **POST register**
3. Edite a **URL** e preenche com estes valores **{{base_url}}/api/client-manager/register**, mantenha o método **POST**
4. Vá até a aba **Headers**
5. Preencha **Key** com **Bootstrap-Token** e **Value** com **{{boostrap_token}}**
6. Vá até a aba **Body** e altere os valores do json para criar um novo registro
7. Clique em **Save**
8. Clique em **Send** 

- Exemplo do json encontrado na aba Body

```
{
    "client_alias": "go-windows",
    "client": 
    {
        "binary_hash":"3ffbfe00006d544fb8b39431172e5875d0dd95022689bd01e9824df6d77c90b6",
        "version": "3.32.0.21",
        "client_alias": "go-windows"
    },
    "device": 
    {
        "architecture": "x64",
        "bios_info": "",
        "cpu_info": "",
        "domain": "senhasegura",
        "hardware_uuid": "ed01a87fed1e147b0d7e374320a92813",
        "hostname": "ke_postman",
        "memory_info": "",
        "operational_system": "Windows 10",
        "vendor_model_info": ""
    },
    "users": 
    [
        {
            "domain": "senhasegura.local",
            "username": "cferreira"
        }
    ]
}
```

9. Você deve obter o **client_id** e **client_secret** no **Body** da seção **Response**
```
        "client_id": "4b744604b67c270c724e10fca2485fa8",
        "client_secret": "689e0e7bc1354a2a5b633616716aba151ef2fa06d9c81afd284b29c3c1fb9bda"
```

### Como obter o Access Token 
1. Clique em **Client Manager API** e vá até a aba **Authorization**
2. Desça até a seção **Configure New Token**
3. Preencha **Token Name** com o nome
4. No campo **Grant type** selecione a opção **Client Credentials**
5. Preencha o **Client ID** e **Client Secret** com os valores obtidos no **Body** da seção **Response**
6. No campo **Client Authentication** selecione a opção **Send as Basic Auth header**
7. Desça e clique em **Get New Access Token**
8. Copie o **Access Token** para utlizar nas requisições

> Este Token dura 1 hora.

- Access Token obtido
```
    Access Token : eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlMzFkMjNlNjQzMDJlN2Y0MzkxNzFjMzI3MThjMDk0MjNjY2Y0YmUyZDE5ODEyYjk3Y2QyMDMxYzZmOGQ1OTYwIiwiZXhwIjoxNzE2NTc5NjY1LCJ0b2tlbl9pZCI6MjMsImlhdCI6MTcxNjU3NjA2NSwiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.erEbDHMhZZ4hvS2QygdD69q1QRjrs_c2CYhrp_APC3WNuJmsWtrIzyO2u2JfrUXxlkdHOsuIasYn5WPs2Va3HhOurieDIrCVqMr34zx5wApUD4a9CxmyD897miFh5zhCQc9TdG3gYbzDpldBm9id3olW2s9sCpJBY-HnuBAhcmdxSWlSNDvSjDRqbcy2Uaz85XtnBEDXYezPaOUvA-j40JGcXbsnZgZwo7cT6ConvU9xQW-_71SGlMRjQ3L4NEQPr9cA5tR14eCU_0a_EsTGIHJf8abwUP8aeGwyIe7IUgMyhCMdWuhrCEkA2tNvvceIK088M1BuU-IxWibQPTGLIA
```