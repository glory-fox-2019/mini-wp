# mini-wp API

Routes
---
Access : http://localhost:3000

Bellows are routes that used in the sever articles

## User
- base routes TODOS url : http://localhost:3000/articles

    - GET : /
        - description : show articles
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                "_id":"5d590f86177f4e9993faf440",
                "title":"cerita baru",
                "content":"pada hari minggu ku mengerjakan portofolio",
                "user":"5d58cc2a1481db8dd602dbe9",
                "created_at":"2019-08-18T08:42:46.543Z","
                updatedAt":"2019-08-18T08:42:51.334Z",
                "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /all-articles
        - description : Get all articles
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                "_id":"5d590f86177f4e9993faf440",
                "title":"cerita baru",
                "content":"pada hari minggu ku mengerjakan portofolio",
                "user":"5d58cc2a1481db8dd602dbe9",
                "created_at":"2019-08-18T08:42:46.543Z","
                updatedAt":"2019-08-18T08:42:51.334Z",
                "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /
        - description : Get articles of logged in user
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                [{
                    "_id":"5d590f86177f4e9993faf440",
                    "title":"cerita baru",
                    "content":"pada hari minggu ku mengerjakan portofolio",
                    "user":"5d58cc2a1481db8dd602dbe9",
                    "created_at":"2019-08-18T08:42:46.543Z","
                    updatedAt":"2019-08-18T08:42:51.334Z",
                "__v":0
                }]
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - GET : /:id
        - description : Get spesific articles based on id
        - body : none
        - params : article id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "_id":"5d590f86177f4e9993faf440",
                    "title":"cerita baru",
                    "content":"pada hari minggu ku mengerjakan portofolio",
                    "user":"5d58cc2a1481db8dd602dbe9",
                    "created_at":"2019-08-18T08:42:46.543Z","
                    updatedAt":"2019-08-18T08:42:51.334Z",
                "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    
    - POST : /
        - description : create new article
        - body : 
            ```
            {
                title : String required,
                content : String,
                image : String,
            }
            ```
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {
                    "_id":"5d590f86177f4e9993faf440",
                    "title":"cerita baru",
                    "content":"pada hari minggu ku mengerjakan portofolio",
                    "user":"5d58cc2a1481db8dd602dbe9",
                    "created_at":"2019-08-18T08:42:46.543Z","
                    updatedAt":"2019-08-18T08:42:51.334Z",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
                
    - PATCH : /:id
        - description : update data of an article
        - body : data that may want to be updated
            ```
            {
                title : String required,
                content : String,
                image : String,
            }
            ```
        - params : article ObjectId
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is updated"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
                
    - DELETE /:id
        - description : delete an article
        - body : none
        - params : article id
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is deleted"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
        



- base routes USERS url : http://localhost:3000/users

    - POST : /
        - description : create a new user
        - body : 
            ```
                { 
                    name : String,
                    email : String,
                    password : String,
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"Muhammad Romi Ario Utomo",
                    "email":"mromiario@gmail.com",
                    "password":"$2a$10$KElSSENK14IoN4zsyY",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
     - GET : /
        - description : get data of user
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"Muhammad Romi Ario Utomo",
                    "email":"mromiario@gmail.com",
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
    - POST : /login
        - description : login to the system
        - body : 
            ```
                { 
                    email : String,
                    password : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 404
                ```
                {"message" : "invalid username/password"}
                ```

    - POST : /googleLogin
        - description : login to the system using google
        - body : Google OAuth Token
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
- base routes IMAGES url : http://localhost:3000/images

    - POST : /upload
        - description : upload new image to google bucket
        - data-form : image file
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                  status: 200,
                  message: 'Your file is successfully uploaded',
                  link: req.file.cloudStoragePublicUrl
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```


Usage
----

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ npm init -y
    $ npm install
    $ nodemon app.js
```