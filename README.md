<h1 align="center">
   Search Api
</h1>

<p align = "center">
Este é o backend da aplicação Search Api - um projeto desenvolvido para a busca de API'S funcionais! O objetivo dessa aplicação é conseguir criar um frontend de qualidade em grupo, utilizando o que foi ensinado no terceiro módulo do curso (M3) - E desenvolver hard skills e soft skills.
</p>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 14 endpoints, sendo em volta principalmente do usuário - podendo cadastrar seu perfil, cadastrar Api's, favoritar e comentar no card da Api <br/>

<a style="display:flex; justify-content:center" href="https://insomnia.rest/run/?label=Kenzie%20Hub&uri=https%3A%2F%2Fgithub.com%2FKenzie-Academy-Brasil-Developers%2Fkenziehub-api%2Fblob%2Fmaster%2FInsomnia_kenzie_hub.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

<blockquote> Para importar o JSON no Insomnia é só clicar no botão "Run in Insomnia". Depois é só seguir os passos que ele irá importar todos os endpoints em seu insomnia.
</blockquote>
<br>

A url base da API é http://localhost:3001

## Rotas que não precisam de autenticação

<h2 align ='center'> Listando API'S </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver as lista de Api's já cadastradas na plataforma, na API podemos acessar a lista dessa forma:

`GET /apiList - FORMATO DA REQUISIÇÃO`

```json
Não é necessário um corpo da requisição
```

Caso dê tudo certo, a resposta será assim:

`GET /apiList - FORMATO DA RESPOSTA - STATUS 201`

```json
[
{
  "userId": "462bdb05-e505-4f93-be48-9ca452f5ec87",
  "name": "test 3",
  "description": "Cadastro de api teste",
  "link": "linkedin/in/johndoe",
  "img": null,
  "uuid": "BjbNBwT"
},
{"..."}
]
```

1. O campo - "link": deve receber a URL que redireciona para a documentação da API.

2. O campo - "img": deve receber uma imagem ou null.

<h2 align ='center'> Criação de usuário </h2>

`POST /users - FORMATO DA REQUISIÇÃO `

```json
{
  "name": "Administrador",
  "email": "admin@mail.com",
  "password": "@Group06"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvdWdAbWFpbC5jb20uYnIiLCJpYXQiOjE2NzI5NDEyOTUsImV4cCI6MTY3Mjk0NDg5NSwic3ViIjoidW5kZWZpbmVkIn0.Qcu7-OioFX60Zp-cpeOPTQxWHC2Rp2knCUXovh8bG1g",
  "user": {
    "email": "admin@mail.com",
    "name": "Administrador",
    "uuid": "2a75e12d-fd1c-481d-ba88-4d8b17103b2a"
  }
}
```

<h2 align ='center'> Possível erro </h2>

Caso você tente cadastrar um e-mail já existente, a resposta de erro será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "status": "error",
  "message": "Email already exists"
}
```

<h2 align = "center"> Login </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "admin@mail.com",
  "password": "@Group06"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvdWdAbWFpbC5jb20uYnIiLCJpYXQiOjE2NzI5NDEyOTUsImV4cCI6MTY3Mjk0NDg5NSwic3ViIjoidW5kZWZpbmVkIn0.Qcu7-OioFX60Zp-cpeOPTQxWHC2Rp2knCUXovh8bG1g",
  "user": {
    "email": "admin@mail.com",
    "name": "Administrador",
    "uuid": "2a75e12d-fd1c-481d-ba88-4d8b17103b2a"
  }
}
```

Com essa resposta, vemos que temos duas informações, o user e o token respectivo, dessa forma você pode guardar o token e o usuário logado no localStorage para fazer a gestão do usuário no seu frontend.

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir cadastrar, favoritar e comentar as Api's desejadas. Caso seja o administrador logado, ele tem a opção de editar o card da Api.

<h2 align ='center'> Cadastrar API'S para a aplicação. </h2>

`POST /apiList - FORMATO DA REQUISIÇÃO`

```json
{
  "userId": "462bdb05-e505-4f93-be48-9ca452f5ec87",
  "name": "testando 2",
  "description": "test test",
  "link": "https://pokeapi.co/",
  "img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fpokeapi&psig=AOvVaw0UXBEgM_ad2z_oxv22KldQ&ust=1673018050978000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCNt4fcsPwCFQAAAAAdAAAAABAJ"
}
```

`POST /apiList - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "userId": "462bdb05-e505-4f93-be48-9ca452f5ec87",
  "name": "testando 2",
  "description": "test test",
  "link": "https://pokeapi.co/",
  "img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fpokeapi&psig=AOvVaw0UXBEgM_ad2z_oxv22KldQ&ust=1673018050978000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCNt4fcsPwCFQAAAAAdAAAAABAJ",
  "uuid": "3TF2NCT"
}
```

<h2 align ='center'> Editar card da Api (Função do admin) </h2>

`PATCH /apiList/uuid - FORMATO DA REQUISIÇÃO`

```json
{
  "description": "api para listar pokemon"
}
```

`PATCH /apiList/uuid - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "userId": "462bdb05-e505-4f93-be48-9ca452f5ec87",
  "name": "testando 2",
  "description": "api para listar pokemon",
  "link": "https://pokeapi.co/",
  "img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fpokeapi&psig=AOvVaw0UXBEgM_ad2z_oxv22KldQ&ust=1673018050978000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCNt4fcsPwCFQAAAAAdAAAAABAJ",
  "uuid": "3TF2NCT"
}
```

Também é possível deletar uma Api cadastrada, utilizando este endpoint:

`DELETE /apiList/uuid`

```
Não é necessário um corpo da requisição.
```

<h2 align ='center'> Listar comentários </h2>

`GET /comments - FORMATO DA REQUISIÇÃO`

```json
Não é necessário um corpo da requisição
```

Caso dê tudo certo, a resposta será assim:

`GET /comments - FORMATO DA RESPOSTA - STATUS 201`

```json
[
{
 	"message": "funcional",
	"userId": "462bdb05-e505-4f93-be48-9ca452f5ec87",
	"apiListId": "wGIDOhO",
	"uuid": 1
},
{"..."}
]
```

<h2 align ='center'> Criar comentários </h2>

Da mesma forma de criar cards de Api, conseguimos criar comentários, dessa forma:

`POST /apiList/uuid/comments - FORMATO DA REQUISIÇÃO`

```json
{
  "message": "funcional",
  "userId": "462bdb05-e505-4f93-be48-9ca452f5ec87"
}
```

`POST /apiList/uuid/comments - FORMATO DE RESPOSTA`

```json
{
  "message": " não funcional",
  "userId": "462bdb05-e505-4f93-be48-9ca452f5ec87",
  "apiListId": "wGIDOhO",
  "uuid": 5
}
```

Também é possível deletar um comentário, utilizando este endpoint:

`DELETE /comments/uuid`

```
Não é necessário um corpo da requisição.
```

---

<h2 align ='center'> Listar favoritos </h2>

`GET /favoriteApi - FORMATO DA REQUISIÇÃO`

```json
Não é necessário um corpo da requisição
```

Caso dê tudo certo, a resposta será assim:

`GET /favoriteApi - FORMATO DA RESPOSTA - STATUS 201`

```json
[
{
		"name": "test 2",
		"description": "test test",
		"link": "https://pokeapi.co/",
		"img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fpokeapi&psig=AOvVaw0UXBEgM_ad2z_oxv22KldQ&ust=1673018050978000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCNt4fcsPwCFQAAAAAdAAAAABAJ",
		"uuid": 2
	},
{"..."}
]
```

<h2 align ='center'> Favoritar Api </h2>

Da mesma forma de criar comentários da Api, conseguimos favoritá-la, dessa forma:

`POST /apiList/uuid/favoriteApi - FORMATO DA REQUISIÇÃO`

```json
[
  {
    "name": "pokemon",
    "description": "test test",
    "link": "https://pokeapi.co/",
    "img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fpokeapi&psig=AOvVaw0UXBEgM_ad2z_oxv22KldQ&ust=1673018050978000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCNt4fcsPwCFQAAAAAdAAAAABAJ"
  }
]
```

`POST /apiList/uuid/favoriteApi - FORMATO DE RESPOSTA`

```json
{
  "name": "pokemon",
  "description": "test test",
  "link": "https://pokeapi.co/",
  "img": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fpokeapi&psig=AOvVaw0UXBEgM_ad2z_oxv22KldQ&ust=1673018050978000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCNt4fcsPwCFQAAAAAdAAAAABAJ",
  "apiListId": "ZjUO4H7",
  "uuid": 4
}
```

Também é possível deletar um favorito, utilizando este endpoint:

`DELETE /favoriteApi/uuid`

```
Não é necessário um corpo da requisição.
```

---

Feito com ♥ by febollinger e DouglasFer :wave:
