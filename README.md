# MINI-WP

##Link deploy 
<br>
mini-wp.adielpratama.com

## Installation
run this command before use this application :)

```javascript
npm i

npm run dev
```

## Environment
PORT='Your running app port'

secret_key='your secret key for jwt'

GCLOUD_PROJECT='your google project id'

CLOUD_BUCKET='your google bucket name'

file_path='your google api credential file path'

SECRET_PASSWORD='secret password for google user'

client_id='client id for using google sign in'

uri='your mongo db atlas uri cluster'
<br>
## This table below is routes of User:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/user/signUp` | POST | `Body` <br>username: String <br>password:String<br>email:String | **Success**<br>`200` OK<br>**Fail**<br>`500` Internal Server Error | create User
`/user/signIn` | POST | `Body`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`404` Not Found | manual Login 
`/user/signInGoogle` | POST | `Body`<br>id_token: String | `200` OK<br>**Fail**<br>`500` Internal Server error | Sign In with google

## This table below is routes of Article:
<br>

Routes | Method | Head/body | Response | Description
---|---|---|---|---
`/articles` | POST | `Headers` <br>token: `String`<br>`Body`<br>title: `String`<br>content: `String`<br>image: `file`<br>author: `UserId` | **Success<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create Article
`/articles` | GET | `none` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Get all users Article
`/articles/:id` | PUT | `Headers`<br>token: `String`<br>`Body`<br>title: `String`<br>content: `String`<br>image: `file`<br>author: `UserId` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request<br>`500` Internal Server Error | Update user article
`/articles/:id` | DELETE | Headers<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete user Article


## /articles GET & POST response
```javascript
//in GET response, you will get array, 
// in POST response, you will get object of new article

/**
 * GET RESPONSE 
 * 
 * */

[
  {
    "_id": //Article Id,
    "title": //Article title,
    "content": //Article content,
    "featured_image": //image link from google cloud storage,
    "author": {
      "_id": //userId,
      "username": //user username
    },
    "createdAt": //article date of create
    "updatedAt": //article date of update
  },
]
/**
 * POST RESPONSE 
 * 
 * */
  {
    "_id": //Article Id,
    "title": //Article title,
    "content": //Article content,
    "featured_image": //image link from google cloud storage,
    "author": {
      "_id": //userId,
      "username": //user username
    },
    "createdAt": //article date of create
    "updatedAt": //article date of update
  },
```

## END 