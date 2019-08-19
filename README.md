# Minipress

deployed URL:
```javascript
http://minipress.yogautomo.com
```

All the APIs endpoint using base URL:
```javascript
http://localhost:3000
```

## Index of Reference:
* [Users]()
* [Articles]()
* [Tags]()

## Users API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| POST | /users/register | none | name: string<br>email: string<br>password: string | Register new user |[Register]()|
| POST | /users/login | none | email: string<br>password: string | Login user |[Login]()|

## Articles API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /articles | {token: JWT token} | none | get all unpublished articles |[Get Unpublished Articles]()|
| GET | /articles/search | {token: JWT token} | none | search user articles |[Search User Articles]()|
| GET | /articles/search-global | {token: JWT token} | none | search global published articles |[Search User Articles]()|
| GET | /articles/published | {token: JWT token} | none | get user published articles |[Get User Published Articles]()|
| GET | /articles/published-global | {token: JWT token} | none | get global published articles |[Get Global Published Articles]()|
| GET | /articles/:articleId | {token: JWT token} | none | get one published articles |[Get Global Published Articles]()|