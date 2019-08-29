# MINI WORDPRESS

```
Deploy Client :
http://miniwp.nurfitrys.com

Deploy Server :
http://35.240.252.139
```

---

## Basic Routes

### Register New User

- Method
    - **POST**
- Route
    - `/register`
- Body
    ```JS
    {
        name: String,
        email: String,
        password: String
    }
    ```
- Response
    - `code: 201`
    ```JS
    {
        _id: "<ObjectId>",
        name: "<name>",
        email: "<email>",
        password: "<hashed password>",
        _v: 0
    }
    ```

### Login

- Method
    - **POST**
- Route
    - `/login`
- Body
    ```JS
    {
        email: String,
        password: String
    }
    ```
- Response
    - `code: 200`
    ```JS
    {
        accesstoken: "<generated access token>"
    }
    ```

### Google Login

- Method
    - **POST**
- Route
    - `/google-login`
- Body
    ```JS
    {
        token: "<google id_token>"
    }
    ```
- Response
    - `code: 200`
    ```JS
    {
        accesstoken: "<generated access token>"
    }
    ```
---

## Article Route

### Get All Article

- Method
    - **POST**
- Route
    - `/articles`
- Response
    - `code: 201`
    ```JS
    [    
        {
            "tags": [
                "traveler",
                "hijab",
                "fashion"
            ],
            "_id": "5d59beef18e8b83b9ff4eb3a",
            "title": "Hijab Traveler",
            "subtitle": "Simak Fashion Ala Hijab Traveler Ini Biar Tetap Stylish Dimanapun!",
            "content": "...",
            "featured_image": "https://storage.googleapis.com/nfs-mini-wp-bucket/upload/1557704975022asset.png",
            "owner": {
                "_id": "5d59bd4becde6735ad4c5edc",
                "name": "NURFITRY S",
                "email": "nurftrys@gmail.com",
                "password": "$2a$10$ykDYizsAUkdyp34QSw1Tq.u4GYXRqsCGP49bJsYGxMHwAiVKIw4hy",
                "__v": 0
            },
            "created_at": "2019-08-19 04:11:11.257",
            "updated_at": "2019-08-19 04:12:38.513",
            "__v": 0
        },
        {
            "tags": [
                "makeup",
                "girls"
            ],
            "_id": "5d59cb47b2895b644e911125",
            "title": "Make Up Tutorial",
            "subtitle": "Simple make up for everyday",
            "content": "...",
            "featured_image": "https://storage.googleapis.com/nfs-mini-wp-bucket/upload/1557704744108asset.png",
            "owner": {
                "_id": "5d59caebb2895b644e911124",
                "name": "SASQIA",
                "email": "sasqia@gmail.com",
                "password": "$2a$10$59IrYBRrvyENFtSxKg.wX.pMNK9tpwM/eVojQnFjvJwcoPg45KbNW",
                "__v": 0
            },
            "created_at": "2019-08-19 05:03:51.044",
            "updated_at": "2019-08-19 05:03:51.044",
            "__v": 0
        },
    ]
    ```

### Get One Article

- Method
    - **GET**
- Route
    - `/articles/:id`
- Response
    - `code: 200`
    ```JS
    
    {
        "tags": [
            "traveler",
            "hijab",
            "fashion"
        ],
        "_id": "5d59beef18e8b83b9ff4eb3a",
        "title": "Hijab Traveler",
        "subtitle": "Simak Fashion Ala Hijab Traveler Ini Biar Tetap Stylish Dimanapun!",
        "content": "...",
        "featured_image": "https://storage.googleapis.com/nfs-mini-wp-bucket/upload/1557704975022asset.png",
        "owner": {
            "_id": "5d59bd4becde6735ad4c5edc",
            "name": "NURFITRY S",
            "email": "nurftrys@gmail.com",
            "password": "$2a$10$ykDYizsAUkdyp34QSw1Tq.u4GYXRqsCGP49bJsYGxMHwAiVKIw4hy",
            "__v": 0
        },
        "created_at": "2019-08-19 04:11:11.257",
        "updated_at": "2019-08-19 04:12:38.513",
        "__v": 0
    },
    ```

### Create New Article

- Method
    - **POST**
- Route
    - `/articles`
- Body
    - FormData
        - tags: text
        - titel: text
        - subtilte: text
        - content: text
        - image: file
- Headers
    `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 201`
    ```JS
    {
        "tags": [
            "traveler",
            "hijab",
            "fashion"
        ],
        "_id": "5d59beef18e8b83b9ff4eb3a",
        "title": "Hijab Traveler",
        "subtitle": "Simak Fashion Ala Hijab Traveler Ini Biar Tetap Stylish Dimanapun!",
        "content": "...",
        "featured_image": "https://storage.googleapis.com/nfs-mini-wp-bucket/upload/1557704975022asset.png",
        "owner": {
            "_id": "5d59bd4becde6735ad4c5edc",
            "name": "NURFITRY S",
            "email": "nurftrys@gmail.com",
            "password": "$2a$10$ykDYizsAUkdyp34QSw1Tq.u4GYXRqsCGP49bJsYGxMHwAiVKIw4hy",
            "__v": 0
        },
        "created_at": "2019-08-19 04:11:11.257",
        "updated_at": "2019-08-19 04:12:38.513",
        "__v": 0
    },
    ```

### Update Article

- Method
    - **PATCH**
- Route
    - `/articles/:id`
- Body
    - FormData
        - tags: text
        - titel: text
        - subtilte: text
        - content: text
        - image: file
- Headers
    `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6694493493378678785",
            "t": 3
        },
        "electionId": "7fffffff0000000000000003",
        "ok": 1,
        "operationTime": "6694493493378678785",
        "$clusterTime": {
            "clusterTime": "6694493493378678785",
            "signature": {
                "hash": "JY+p9KIupDSIx1wB6+cxaCE1Nd4=",
                "keyId": "6676677921790230530"
            }
        }
    }
    ```
### Delete Article

- Method
    - **DELETE**
- Route
    - `/articles/:id`
- Headers
    `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "n": 1,
        "opTime": {
            "ts": "6694493841271029761",
            "t": 3
        },
        "electionId": "7fffffff0000000000000003",
        "ok": 1,
        "operationTime": "6694493841271029761",
        "$clusterTime": {
            "clusterTime": "6694493841271029761",
            "signature": {
                "hash": "0UAKs4Z/lrKo93ADDR53AIdIWg0=",
                "keyId": "6676677921790230530"
            }
        },
        "deletedCount": 1
    }
    ```
    
---

## Error Response

### The error response includes following fields :

- Message: the error message
- Details: a field for additional information, which may or may not be populated
- Description: description of the specific error
- Code: Unique error response code
- Http_response:
    ```
    Message: HTTP response message
    Code: HTTP response status code
    ```

### Example Code :

- `code : 400`
```
    BAD REQUEST
    Invalid syntax for this request was provided
```
- `code : 401`
```
    UNAUTHORIZED
    Account is not authorized to access the requested resource
```
- `code : 403`
```
    FORBIDDEN
    Account is not authorized to access the requested resource
```
- `code : 404`
```
    NOT FOUND
    Could not find the resource you requested
```
- `code : 500`
```
    INTERNAL SERVER ERROR
    Unexpected internal server error
```

---

## Usage

Server: 
```
$ npm install
$ nodemon app.js
```

Client:
```
$ live-server --host=localhost
```

## Access point:
Server: http://localhost:3000

Client: http://localhost:8080
