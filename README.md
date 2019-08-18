## LINK DEPLOY
http://mini-wp.fauzi-nurfadillah.com



## User Route
Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/user/myprofile` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error <br> `401` unauthorized | Get Profile Info
`/user/login` | POST | **Body**<br>email: `String`<br>password: `String` | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | Login User
`/user/register` | POST | **Body**<br> fullname : `String` <br> email : `String` <br> password : `String` | **Sucess**<br> `201` Created <br> **Fail**<br> `500` Internal Server Error <br> `400` Bad Request | Register User
`user/loginOauth` | Post | **Body**<br> token : `String` | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | Login By Google

## Articles Route
Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/article/create` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>image: `String`<br> Status : `number`| **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error <br> `401` Unauthorized | Create article
`/article/home` | GET | `none` | **Success**<br> `200` OK <br> **Fail** <br> `500` Internal Server Error | Get Article Home
`/article/update/:id` | PATCH | **Headers** <br> token: `String` <br> **Body** <br> title: `String`(optional) <br>content: `String` (optional) <br>image: `String` (required) <br> Status : `number` (optional) <br> **Params** <br> id : `String` (required) | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error <br> `401` Unauthorized | Update Article
`/article/delete/:id` | DELETE |  **Params** <br> id : `String` (required) | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error <br> `401` Unauthorized | Delete Article
`/article/view/:id` | GET | **Params** <br> id : `String` (required) | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error <br> | Get 1 Article by ID
`/article/myarticle/:status` | GET | **Headers** token : `String` <br> **Params** <br> status : `Number` (required) | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error <br> `401` Unauothorized | Get Article by status and ID

 


