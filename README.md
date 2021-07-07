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
* [Screenshots]()
* [Users]()
* [Articles]()
* [Tags]()

## Screenshots
1. Login Page
![Login Page](https://i.ibb.co/6Yj9FHH/Screen-Shot-2020-03-12-at-13-26-01.png)
2. Login with Google Account
![Login with Google Account](https://i.ibb.co/t4pGhCf/Screen-Shot-2020-03-12-at-13-26-51.png)
3. Draft Page
![Draft Page](https://i.ibb.co/VvNRhRB/Screen-Shot-2020-03-12-at-13-28-07.png)
4. Published Page
![Published Page](https://i.ibb.co/HG6myFt/Screen-Shot-2020-03-12-at-13-28-17.png)
5. Discover Page
![Discover Page](https://i.ibb.co/St2NKKn/Screen-Shot-2020-03-12-at-13-39-33.png)
6. Article Detail
![Article Detail](https://i.ibb.co/xGdM1tR/Screen-Shot-2020-03-12-at-13-40-18.png)

## Users API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| POST | /users/register | none | name: string<br>email: string<br>password: string | Register new user |[Register]()|
| POST | /users/login | none | email: string<br>password: string | Login user |[Login]()|

## Articles API
|  HTTP  | Endpoint | Headers | Body | Description | Reference |
|---|---|---|:-:|---|---|
| GET | /articles | {token: JWT token} | none | get user unpublished articles |[Get User Unpublished Articles]()|
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

## Articles
+ ### Get Authenticated User Unpublished Articles
  method: `GET`<br>
  endpoint: `/articles`
  
  #### _Request_ :
  * headers: 
    {
        token: <JWT token>
    }
  * body: 
    none
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: false,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        },
        ...,
    ]
    ```

+ ### Search Authenticated User Articles
  method: `GET`<br>
  endpoint: `/articles/search`
  
  #### _Request_ :
  * headers:
    ```javascript
    {
        token: <JWT token>
    }
    ```
  * query:
    ```javascript
    {
        keyword: String,
        page: String
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: false,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        },
        ...,
    ]
    ```

+ ### Search Global Articles
  method: `GET`<br>
  endpoint: `/articles/search-global`
  
  #### _Request_ :
  * query:
    ```javascript
    {
        keyword: String
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: false,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        },
        ...,
    ]
    ```

+ ### Get Authenticated User Published Articles
  method: `GET`<br>
  endpoint: `/articles/published`
  
  #### _Request_ :
  * headers:
    ```javascript
    {
        token: <JWT token>
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: false,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        },
        ...,
    ]
    ```

+ ### Get Global Published Articles
  method: `GET`<br>
  endpoint: `/articles/published-global`
  
  #### _Request_ :
  *
    ```javascript
    none
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: false,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        },
        ...,
    ]
    ```

+ ### Get One Article
  method: `GET`<br>
  endpoint: `/articles/:articleId`
  
  #### _Request_ :
  * params:
    ```javascript
    articleId: ObjectId
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [ 
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: false,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        }
    ]
    ```

+ ### Create Article
  method: `POST`<br>
  endpoint: `/articles`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: <JWT token>
    }
    ```
  * body:
    ```javascript
    {
        title: String,
        content: String,
        featured_image: File,
        tags: String ("separated by coma")
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        tags: [ [Object] ],
        _id: 5d59fcdd3fa2f108dcb13bb0,
        title: 'Experimental',
        content: '<p>hoahoahahahhaa</p>',
        author: 5d343941b2117b5311c7f899,
        featured_image:
        'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
        featured_image_name: '1566178517194102757357.jpg',
        isPublished: true,
        createdAt: 2019-08-19T01:35:25.278Z,
        updatedAt: 2019-08-19T01:35:25.282Z,
        __v: 0 
    }
    ```
  - 400<br>
    If one of field is empty
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' is required",
          ....
      ]
    }
    ```

+ ### Edit Article
  method: `PUT`<br>
  endpoint: `/articles/edit/:articleId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: <JWT token>
    }
    ```
  * params
    ```javascript
    articleId: <ObjectId>
    ```
  * body:
    ```javascript
    {
        title: String,
        content: String,
        featured_image: File,
        tags: String ("separated by coma")
    }
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        tags: [ [Object] ],
        _id: 5d59fcdd3fa2f108dcb13bb0,
        title: 'Experimental',
        content: '<p>hoahoahahahhaa</p>',
        author: 5d343941b2117b5311c7f899,
        featured_image:
        'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
        featured_image_name: '1566178517194102757357.jpg',
        isPublished: true,
        createdAt: 2019-08-19T01:35:25.278Z,
        updatedAt: 2019-08-19T01:35:25.282Z,
        __v: 0 
    }
    ```
  - 400<br>
    If one of field is empty
    ```javascript
    {
      "code": 400,
      "message": [
          "Path 'name' is required",
          ....
      ]
    }
    ```
  - 404<br>
    ```javascript
    {
      "code": 404,
      "message": "Not found"
    }
    ```

+ ### Publish Article
  method: `PUT`<br>
  endpoint: `/articles/publish/:articleId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: <JWT token>
    }
    ```
  * params
    ```javascript
    articleId: <ObjectId>
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        tags: [ [Object] ],
        _id: 5d59fcdd3fa2f108dcb13bb0,
        title: 'Experimental',
        content: '<p>hoahoahahahhaa</p>',
        author: 5d343941b2117b5311c7f899,
        featured_image:
        'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
        featured_image_name: '1566178517194102757357.jpg',
        isPublished: true,
        createdAt: 2019-08-19T01:35:25.278Z,
        updatedAt: 2019-08-19T01:35:25.282Z,
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
      "code": 404,
      "message": "Not found"
    }
    ```

+ ### Delete Article
  method: `DELETE`<br>
  endpoint: `/articles/delete/:articleId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: <JWT token>
    }
    ```
  * params
    ```javascript
    articleId: <ObjectId>
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {
        tags: [ [Object] ],
        _id: 5d59fcdd3fa2f108dcb13bb0,
        title: 'Experimental',
        content: '<p>hoahoahahahhaa</p>',
        author: 5d343941b2117b5311c7f899,
        featured_image:
        'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
        featured_image_name: '1566178517194102757357.jpg',
        isPublished: true,
        createdAt: 2019-08-19T01:35:25.278Z,
        updatedAt: 2019-08-19T01:35:25.282Z,
        __v: 0 
    }
    ```
  - 404<br>
    ```javascript
    {
      "code": 404,
      "message": "Not found"
    }
    ```

+ ### Filter Article By Tag (clicking Tag)
  method: `DELETE`<br>
  endpoint: `/articles/by-tag/:tagId`
  
  #### _Request_ :
  * headers
    ```javascript
    {
        token: <JWT token>
    }
    ```
  * params
    ```javascript
    tagId: <ObjectId>
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    [
        {
            tags: [ [Object] ],
            _id: 5d59fcdd3fa2f108dcb13bb0,
            title: 'Experimental',
            content: '<p>hoahoahahahhaa</p>',
            author: 5d343941b2117b5311c7f899,
            featured_image:
            'https://storage.googleapis.com/mini-wp-bucket-yoga/1566178517194102757357.jpg',
            featured_image_name: '1566178517194102757357.jpg',
            isPublished: true,
            createdAt: 2019-08-19T01:35:25.278Z,
            updatedAt: 2019-08-19T01:35:25.282Z,
            __v: 0 
        },
        ...
    ]
    ```

