# mini-wp

## REST API
All end point routes start with http://localhost:3000

## `/users` end point

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
|`/gsignin`|POST|`none`|`none`|Sign in via 3rd api google and get access token
|`/register`|POST|`none`|`name, email, password`|Register new account
|`/signin`|POST|`none`|`email, password`|Sign in and get access token

## `/images` end point

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
|`/upload`|POST|`none`|`image`|upload picture to google cloud storage
|`/`|DELETE|`none`|`image`|delete file in google cloud storage

## `/articles end point
| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
|`/`|GET|`token`|`none`|Get all user's articles info
|`/all`|GET|`token`|`none`|Get all articles info
|`/`|POST|`token`|`title, content, image`|create new article
|`/:id`|PATCH|`token`|`title, content, image`|edit article info
|`/:id`|DELETE|`token`|`none`|Delete an article
