# Postingg
A post sharing app like word press for Portofolio on Hacktiv8 Bootcamp. Deployed on: http://postingg.luqmanzakariya.com

## USAGE

Before using the API, make sure you install these packages on global by running this code:

    npm install -g parcel-bundler

### Usage Client
You can access the client via http://localhost:1234 (by default).
Make sure you have parcel installed in your computer, then go to client folder and run these commands:

    parcel index.html

## Usage Server
You can access the client via http://localhost:3000.
Make sure you have Node.js and npm installed in your computer, then go to server folder and run these commands:

    npm install
    npm start
    npm run dev

## List of User routes:
base url : http//localhost:3000/users

example :

    http//localhost:3000/users/register

| Route  | HTTP | Headers(s) | Body | Sucess Response | Error Response  | Description         |
| ------ | ---- | ---------- | - |-| ---- | ----- | ------------------- |
| `/users/register` | POST | `none` | `name (string, required), email (string, required), password (string, required)` | (201) json(_id, name, email, password (encrypted), createdAt, updatedAt, __v) | (500) json(code, message)  | Sign up with new user info |
| `/users/login` | POST | `none` | `email (string, required), password (string, required)` |  (200) json(token, _id, name, email) | (500) json(code, message), (401) json(code, message)  | Sign in and get an access token based on credentials |
| `/users/loginGoogle` | POST | `none`  | `none`|  (200) json(token, _id, name, email) | (500) json(code, message) | Sign in and get an access token based on credentials |


## List of Article routes:
base url : http//localhost:3000/articles

example :

    http//localhost:3000/articles/all

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/all` | GET | `none` | `none` | (200) json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data) )| (500) json(code, message) | Get all article |
| `/search/:title` | GET | `none` | `none` | (200) [json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data)  | (500) json(code, message)] | Get all article based on title search |
| `/article/:id` | GET | `none` | `none` | (200) json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data) | (500) json(code, message) | Find article details based on id |
| `/tags/:id` | GET | `token` | `none` | (200) json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data) | (500) json(code, message), (403) json(message: unauthorized) | find list article based on tags |
| `/own` | GET | `token` | `none` | (200) [json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data)] | (500) json(code, message), (403) json(message: unauthorized) | Get user's created article |
| `/create` | POST | `token` | `title(string), content(string), tags(string), fileUrl(string)` |(201) json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data) ) | (500) json(code, message), (403) json(message: unauthorized) | create new article |
| `/:id` | PATCH | `token` | `title(string), content(string), tags(string), fileUrl(string)` | json( _id(object),title(string),content(string),fileUrl(string),UserId(object),CreatedAt(date),UpdatedAt(data) | (500) json(code, message), (403) json(message: unauthorized) | update article data by id |
| `/:id` | DELETE | `token` | `none` | (200) json(n(number),modified(number),ok(number))| (500) json(code, message), (403) json(message: unauthorized) | delete article by id |

## List of Tag routes:
base url : http//localhost:3000/articles

example :

    http//localhost:3000/find/:id

| Route | HTTP | Headers(s) | Body | Sucess Response | Error Response | Description |
| ----- | ---- | ---------- | ---- | ----------------| -------------- | ---|
| `/findAll` | GET | `none` | `none` | (200) [json( name(string), _id(object),CreatedAt(date),UpdatedAt(data)] | (500) json(code, message)] | Find all tags name created |
| `/find/:id` | GET | `none` | `none` | (200) json( name(string), _id(object),CreatedAt(date),UpdatedAt(data)] | (500) json(code, message) | (500) json(code, message) | Find all article based on tags |
