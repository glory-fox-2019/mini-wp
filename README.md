# Mini-Wp

## Getting Started  
Open env template, fill in the environment variables, and save it as .env  
Install live-server `npm install -g parcel-bundler`  
Install nodemon `npm install -g nodemon`  
Run `npm run dev` in the server folder  
Run `parcel index.html` in the client folder
The deployed version is available at wordtiv8.tediyaki.site

## RESTful API  
Here are the APIs that are provided in this portofolio  

| Route | HTTP | Header(s) | Body | Description |
| --- | --- | --- | --- | --- |
| `/user/register` | POST | `none` | `name, email, password` | Register with a new user info |
| `/user/login` | POST | `none` | `email, password` | Sign in and get an access token based on credentials |
| `/user/google-sign-in` | POST | `none` | `id_token` | Sign in via Google and get an access token based on credentials |
| `/articles` | GET | `token` | `none` | Get all login user's articles |
| `/articles` | POST | `token` | `title, content, image file` | Create an article |
| `/articles/:_id` | PUT | `token` | `title, content, image file` | Update an article title, content, and featured image |
| `/articles/:_id` | PATCH | `token` | `title, content` | Update article title and content without changing the featured image |
| `/articles/:_id` | DELETE | `token` | `none` | Delete an article |

By default, the api starts with http://miniwp-api.tediyaki.site

## User Route API

### Post /user/register

Register with your name, email, and password  
On successful creation, it will send back your name and authentication token

```
{
    "name": <user name>,
    "token": <hashed token>
}

status: 201
```

If the name field is empty it will display
```
{
    "message": "User validation failed: full_name: Please enter your name"
}

status: 500
```

If the password field is empty, it will display
```
{
    "message": "Please enter your password"
}

status: 400
```

If the email field is empty, it will display
```
{
    "message": "User validation failed: email: Please enter your email"
}

status: 500
```

If the email is invalid, it will display
```
{
    "message": "User validation failed: email: This email is not valid"
}

status: 500
```

### Post /user/login
Sign in with email and password  
On successful login, the name and authentication token will be returned

```
{
    "_id": <user's id>,
    "name": <user's name>,
    "token": <user's authentication token>
}

status: 200
```

If the email and password are mismatched, this error will be displayed

```
{
    "message": "Wrong email / password"
}

status: 403
```

### Post /user/google-sign-in

Sign in using Google  
On successful login, the name and authentication token will be returned

```
{
    "_id": <user's id>
    "full_name": <user's name>,
    "token": <user's authentication token>
}

status: 200
```

If the user try to force sign-in without Google's id token, this error message will be displayed  
```
{
    "message": "The verifyIdToken method requires an ID Token"
}

status: 500
```

If the token is wrong, this will be the output
```
{
    "message": "Wrong number of segments in token: <the wrong token>"
}

status: 500
```

## Article Route API

User need to be logged in in order to access article API,  
If the user is not authenticated this message will be displayed

```
{
    "message": "You are not logged in"
}

status: 403
```

### GET /articles

Getting all the logged in user's article

example output:
```
[
    {
        "_id": <article's id>,
        "title": <article's title>,
        "content": <article's content in html style>,
        "author": {
            "_id": <logged in user's id>,
            "name": <logged in user's name>,
            "email": <logged in user's email>
        },
        "featured_image": <article's image link>,
        "createdAt": <date created>,
        "updatedAt": <date updated>,
        "__v": 0
    }
]

status: 200
```
### POST /articles
Fill in title, content, and image file to create an article  
On successful creation, it will displayed the newly created article

```
{
    "_id": <article id>,
    "title": <article title>,
    "content": <article content>,
    "author": <article's author id>,
    "featured_image": <article image link>,
    "createdAt": <created time>,
    "updatedAt": <last updated time>,
    "__v": 0
}

status: 201
```
If any of the field is missing, it will displayed these messages

```
case: title

{
    "message": "Article validation failed: title: Please enter title"
}

case: content

{
    "message": "Article validation failed: content: Please enter content"
}

case: image

{
    "message": "Cannot read property 'cloudStoragePublicUrl' of undefined"
}

status: 500
```

If the file is not an image, it will displayed this message

```
{
    "message": "Only images are allowed"
}

status: 500
```

# A user must be authorized to do below operations or this message wil be displayed

```
{
    message: "You are not authorized"
}

status: 401
```

### PUT /articles/:_id
Update an article title, content, and featured image using form data
A new image MUST be provided

On successful update, the updated article will be displayed

```
{
    "_id": <article id>,
    "title": <new title>,
    "content": <new content>,
    "author": <article's author,
    "featured_image": <new image link>,
    "createdAt": <created time>,
    "updatedAt": <last updated time>,
    "__v": 0
}
```

### PATCH /articles/:_id
Update article title and content without changing the featured image
On successful update, the updated article will be displayed

```
{
    "_id": <article id>,
    "title": <new title>,
    "content": <new content>,
    "author": <article's author,
    "featured_image": <image link>,
    "createdAt": <created time>,
    "updatedAt": <last updated time>,
    "__v": 0
}
```

### DELETE /articles/:_id
Delete an article based on its id

On successful deletion, it will return status 204