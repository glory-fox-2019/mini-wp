#  Mini Wp API
Mini WP is a  mini Content Management System for Posts/Articles
# Auth
In order to prevent data leaked. User need  Authentication in some places. Authentications that can be use are Register / Login / Login with Google. 

If **Authentication is required**, add `token` on headers. You can get `token` from Authentication.
Headers:
```
{
	token: 'given_token'
}
```
## Register
URL:  `/api/user/register`
Method: `POST`
Status Code:  **`201`**

Request (Example): 
```javascript
{
	name : "Just Arya",
	username : "justarya",
	password : "password",
	email : "justarya@mail.com"
}
```

Respond (Example):
```javascript
{
	token : "slkdfjsadfjoi290r302r3u320jf.3420r230h832h89.23f9h824f",
	payload : {
			id:  "5eh938quy9hf380a",
			name : "Just Arya",
			username:  "justarya",
			email:  "justarya@mail.com",
			role:  "author",
			loginWith: "normal"
		}
}
```
<br>

## Login
URL:  `/api/user/login`
Method: `POST`
Status Code:  **`200`**

Request (Example): 
```javascript
{
	email : "justarya@mail.com",
	password : "password"
}
```

Respond (Example):
```javascript
{
	token : "slkdfjsadfjoi290r302r3u320jf.3420r230h832h89.23f9h824f",
	payload : {
			id:  "5eh938quy9hf380a",
			name : "Just Arya",
			username:  "justarya",
			email:  "justarya@mail.com",
			role:  "author",
			loginWith: "normal"
		}
}
```

## Login With Google
URL:  `/api/user/login/google`
Method: `POST`
Status Code:  **`200`**

Request (Example): 
```javascript
{
	idToken : "token_from_google_oauth",
}
```

Respond (Example):
```javascript
{
	token : "slkdfjsadfjoi290r302r3u320jf.3420r230h832h89.23f9h824f",
	payload : {
			id:  "5eh938quy9hf380a",
			name : "Just Arya",
			username:  "justarya",
			email:  "justarya@mail.com",
			role:  "author",
			loginWith: "google"
		}
}
```


## Get User Data
URL:  `/api/user/`
Method: `GET`
Status Code:  **`200`**
Authentication: `TRUE`

Respond (Example):
```javascript
{
	id:  5d58e9c460b7cf5884523a52,
	name : "Just Arya",
	username:  "justarya",
	email:  "justarya@mail.com",
	role:  "author",
	loginWith: "normal"
}
```
<br/>

# User's Post (Authentication)
## Get All User's Post
URL: `/api/user/posts/`
Method: `GET`
Status Code: **`200`**
Authentication: `REQUIRED`

Response (Example):
```javascript
[
	{
		tags: [ 'postman' ],
		_id: 5d58f23b25cf7759b1e46c39,
		title: 'Mr Postman',
		content: 'Maybe you never hear about mr postman, but...',
		thumbnail: 'http://url-of-thumbnail',
		userId: 5d58e9c460b7cf5884523a52,
		createdAt: 2019-07-18T06:37:47.194Z,
		updatedAt: 2019-08-18T06:37:47.194Z
	},
	 ...
]
```

## Search User's Post
URL: `/api/user/posts?search=keyword`
Method: `GET`
Status Code: **`200`**
Authentication: `REQUIRED`

Response (Example):
```javascript
[
	{
		tags: [ 'postman' ],
		_id: 5d58f23b25cf7759b1e46c39,
		title: 'Mr Postman',
		content: 'Maybe you never hear about mr postman, but...',
		thumbnail: 'http://url-of-thumbnail',
		userId: 5d58e9c460b7cf5884523a52,
		createdAt: 2019-07-18T06:37:47.194Z,
		updatedAt: 2019-08-18T06:37:47.194Z
	},
	 ...
]
```

## Find One User's Post
URL: `/api/user/posts/:id`
Method: `GET`
Status Code: **`200`**
Authentication: `REQUIRED`

Response (Example):
```javascript
{
	tags: [ 'postman' ],
	_id: 5d58f23b25cf7759b1e46c39,
	title: 'Mr Postman',
	content: 'Maybe you never hear about mr postman, but...',
	thumbnail: 'http://url-of-thumbnail',
	userId: 5d58e9c460b7cf5884523a52,
	createdAt: 2019-07-18T06:37:47.194Z,
	updatedAt: 2019-08-18T06:37:47.194Z
}
```

## Create User's Post
URL: `/api/user/posts/`
Method: `GET`
Status Code: **`201`**
Authentication: `REQUIRED`

Request (Example):
```javascript
{
	tags: [ 'postman' ],
	title: 'Mr Postman',
	content: 'Maybe you never hear about mr postman, but...',
	thumbnail: File
}
```

Response (Example):
```javascript
{
	tags: [ 'postman' ],
	_id: 5d58f23b25cf7759b1e46c39,
	title: 'Mr Postman',
	content: 'Maybe you never hear about mr postman, but...',
	thumbnail: 'http://url-of-thumbnail',
	userId: 5d58e9c460b7cf5884523a52,
	createdAt: 2019-07-18T06:37:47.194Z,
	updatedAt: 2019-08-18T06:37:47.194Z
}
```

## Edit User's Post
URL: `/api/user/posts/:id`
Method: `PUT`
Status Code: **`200`**
Authentication: `REQUIRED`

Request (Example):
```javascript
{
	tags: [ 'postman' ],
	title: 'Mr Postman',
	content: 'Maybe you never hear about mr postman, but...',
	thumbnail: File
}
```

Response (Example):
```javascript
{
	tags: [ 'postman' ],
	_id: 5d58f23b25cf7759b1e46c39,
	title: 'Mr Postman',
	content: 'Maybe you never hear about mr postman, but...',
	thumbnail: 'http://url-of-thumbnail',
	userId: 5d58e9c460b7cf5884523a52,
	createdAt: 2019-07-18T06:37:47.194Z,
	updatedAt: 2019-08-18T06:37:47.194Z
}
```

## Delete User's Post
URL: `/api/user/posts/:id`
Method: `DELETE`
Status Code: **`200`**
Authentication: `REQUIRED`

Response (Example):
```javascript
{
	message: 'Successfully delete post',
}
```

# Public Post
Public post routes doesn't require any authentication

## All Post
URL: `/api/posts/`
Method: `GET`
Status Code: **`200`**

Response (Example):
```javascript
[
	{
		tags: [ 'postman' ],
		_id: 5d58f23b25cf7759b1e46c39,
		title: 'Mr Postman',
		content: 'Maybe you never hear about mr postman, but...',
		thumbnail: 'http://url-of-thumbnail',
		userId: 5d58e9c460b7cf5884523a52,
		createdAt: 2019-07-18T06:37:47.194Z,
		updatedAt: 2019-08-18T06:37:47.194Z
	},
	 ...
]
```

## Find One Post
URL: `/api/posts/:id`
Method: `GET`
Status Code: **`200`**

Response (Example):
```javascript
{
	tags: [ 'postman' ],
	_id: 5d58f23b25cf7759b1e46c39,
	title: 'Mr Postman',
	content: 'Maybe you never hear about mr postman, but...',
	thumbnail: 'http://url-of-thumbnail',
	userId: 5d58e9c460b7cf5884523a52,
	createdAt: 2019-07-18T06:37:47.194Z,
	updatedAt: 2019-08-18T06:37:47.194Z
}
```

# Error handler

Error Status:
`401` : Unauthorized access, Authentication needed
`403` :  Wrong Email/Password, No Access to certain post
`404` : No post found
`500`: Internal Server Error
 


Error (Example):
```javascript
{
	httpStatus: 500,
	message: 'Internal Server Error'
}
```
