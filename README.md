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
| GET | /articles/:articleId | {token: JWT token} | none | get one published articles |[Get One Article]()|
| PUT | /articles/edit/:articleId | {token: JWT token} | title: string<br>content: string<br>featured_image: file<br>tags: string | get one published articles |[Update Article]()|
| PUT | /articles/publish/:articleId | {token: JWT token} | none | publish an article |[Publish Article]()|
| DELETE | /articles/delete/:articleId | {token: JWT token} | none | delete an article |[Delete Article]()|
| GET | /articles/by-tag/:tagId | {token: JWT token} | none | search article by tag |[Filter Article by Tag]()|

# Request & Response Details

## Users
+ ### Register
  method: `POST`<br>
  endpoint: `/users/register`
  
  #### _Request_ :
  * body: 
    ```javascript
    name: String, required
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
      name: "johnsnow",
      email: "johnsnow@mail.com",
      password: "V5MUfXvUrP9XItkuxzfziOqjRTqWYsqusNDUsORJ7Xqae9OrU33e2"
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
          "notNull Violation: Please input your name",
          "\nnotNull Violation: Please input your email"
      ]
    }
    ```

+ ### Login
  method: `POST`<br>
  endpoint: `/users/login`
  
  #### _Request_ :
  * body: 
    ```javascript
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Get an access token (JWT Token)
    {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGY4NTEyNDVlNmZiMzlmNTAwN2NiYSIsIm5hbWUiOiJ5b2dhIiwiZW1haWwiOiJ5b2dhQG1haWwuY29tIiwiaWF0IjoxNTY1NTE2NjMyfQ.FeFWVOZuT1TBLszVY5gXS_XST4uUDA-PO8uM6KVPJJw"
    }
    ```
  - 404
    ```javascript
    {
      "code": 404,
      "message": "Wrong email / password"
    }
    ```