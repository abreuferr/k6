# Como obter o client_id e o client_secret

1. Cofre
- acessar o cofre > Go Endpoint Manager > Configurações > Parâmetros > New Go Endpoint Manager
- Obter o valor "Token do cofre" - 018c5a0f-acb1-73e7-8994-85e0b76ff146

2. Postman
- Workspaces > Create Workspace > Blank Workspace > Botão Next
    Name - API senhasegura
    Who can access your workspace? - Only me
- Botão Create 
- Botão Import > Apontar para o arquivo .JSON

3. Postman (Configuração)
- Client Manager API > Opção "Variables"
    - Alterar o endereço IP do cofre
    - Add new Variable
        - Bootstrap-Token / 018c5a0f-acb1-73e7-8994-85e0b76ff146 / Collection
- Botão Save

3. Postman (Configuração)
- Client Manager API > POST register
    POST : {{base_url}}/api/client-manager/register
    Aba Headers
        Key : Bootstrap-Token
        Value (EM VERMELHO) : 018c5a0f-acb1-73e7-8994-85e0b76ff146
    Aba Body
        Alterar os valores para criar um novo registro

####

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

####

    - Botão "Send"

    Retornar o client_id e client_secret
        "client_id": "4b744604b67c270c724e10fca2485fa8",
        "client_secret": "689e0e7bc1354a2a5b633616716aba151ef2fa06d9c81afd284b29c3c1fb9bda"

- Client Manager API > Aba "Authorization" > 
- Configure New Token
    Token Name : cferreira
    Grant type : Client Credentials
    Client ID : 4b744604b67c270c724e10fca2485fa8
    Client Secret : 689e0e7bc1354a2a5b633616716aba151ef2fa06d9c81afd284b29c3c1fb9bda
- Botão "Get New Access Token"
    Access Token : eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlMzFkMjNlNjQzMDJlN2Y0MzkxNzFjMzI3MThjMDk0MjNjY2Y0YmUyZDE5ODEyYjk3Y2QyMDMxYzZmOGQ1OTYwIiwiZXhwIjoxNzE2NTc5NjY1LCJ0b2tlbl9pZCI6MjMsImlhdCI6MTcxNjU3NjA2NSwiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.erEbDHMhZZ4hvS2QygdD69q1QRjrs_c2CYhrp_APC3WNuJmsWtrIzyO2u2JfrUXxlkdHOsuIasYn5WPs2Va3HhOurieDIrCVqMr34zx5wApUD4a9CxmyD897miFh5zhCQc9TdG3gYbzDpldBm9id3olW2s9sCpJBY-HnuBAhcmdxSWlSNDvSjDRqbcy2Uaz85XtnBEDXYezPaOUvA-j40JGcXbsnZgZwo7cT6ConvU9xQW-_71SGlMRjQ3L4NEQPr9cA5tR14eCU_0a_EsTGIHJf8abwUP8aeGwyIe7IUgMyhCMdWuhrCEkA2tNvvceIK088M1BuU-IxWibQPTGLIA
