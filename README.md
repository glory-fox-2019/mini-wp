# mini-wp
Best Mini Wordpress in Town

# Routing

Complete Routing of this App

#  User Routes

Includes SignIn, Google SignIn, and Resgitration

# POST /user/signin

To Sign In without using google authorization

    url: 'http://localhost:3000/user/signin'
    headers: token *required*,
    body: {
        email:{
            type: string
            required: true
        } ,
        password:{
            type: string
            required: true
        }
    },
    response status: {
        success: {
            message: 'Login Success'
            status: 200
        },
        error: {
            message:'Not Found',
            status: 404
        }
    }



# POST /user/Gsignin

To Sign In using google authorization

    url: 'http://localhost:3000/user/Gsignin'
    headers: token *required*,
    body: {
        email:{
            type: string
            required: true
        } ,
        password:{
            type: string
            required: true
        }
    },
    response status: {
        success: {
            message: 'Login Success'
            status: 200
        },
        error: {
            message:'Not Found',
            status: 404
        }
    }


# POST /user/register

To Register 

    url: 'http://localhost:3000/user/register'
    headers: none,
    body: {
        name:{
            type: string
            required: true
        } ,
        email:{
            type: string
            required: true
        },
        password:{
            type:string,
            required:true
        }
    },
    response status: {
        success: {
            message: 'Account is successfully created'
            status: 201
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }

    # Article Routes

Includes, CRUD of articles, Getting current user profile, filtering articles List

# POST /articles/create

User creating articles 

    url: 'http://localhost:3000/articles/create'
    headers: token *required*,
    body: {
        title:{
            type: string
            required: true
        } ,
        content:{
            type: string
            required: true
        },
        createdAt:{
            type:Date,
            required:true
        },
        featured_image:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }
    },
    response status: {
        success: {
            data : {
                title,
                content,
                featured_image,
                UserId,
                author
            },
            message: 'article is successfully created'
            status: 201
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }


# PATCH /articles/update/:id

User can update thei articles

    url: 'http://localhost:3000/articles/update/:id'
    headers: token *required*,
    body: {
        title:{
            type: string
        } ,
        content:{
            type: string
        },
        featured_image:{
            type:String,
        },
        } 
    },
    response status: {
        success: {
            data : {
                updatedData
            },
            message: 'Data is successfully updated'
            status: 201
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }

# DELETE /articles/delete/:id

## Deleting User's articles

    url: 'http://localhost:3000/articles/delete/:id'
    headers: token *required*
    body: none,
    response status: {
        success: {
            data : {
                title,
                content,
                featured_image,
                UserId,
                author
            },
            message: 'article is successfully deleted'
            status: 200
        },
        error: {
            message: 'internal server error'
            status: 500
        }
    }

# GET /articles/

## Get All Article

    url: 'http://localhost:3000/articles',
    headers: token *required*,
    body: none,
    response status: {
        success: {
            name : {
                type: string
            },
            data,
            message: 'articles are found'
            status: 200
        },  error: {
            message: 'Wrong token'
            status: 404
            }
    }
# GET /articles/filter/:id

## Get Article by their Id

    url: 'http://localhost:3000/articles/filter/:id'
    headers: token *required*,
    body: 
    id: {
        type: String
        },
    response status: {
        success: {
            data : {
                title,
                content,
                featured_image,
                UserId,
                author
            },
            message: 'found your article'
            status: 200
        },
        error: {
            message: 'Not Found'
            status: 404
        }
    }


# GET /articles/myArticles

## Get Current User's Articles

    url: 'http://localhost:3000/articles/myArticles'
    headers: token *required*,
    body: none,
    response status: {
        success: {
            data : {
                data (array of articles)
            },
            message: 'found your articles'
            status: 200
        },
        error: {
            message: 'Not Found'
            status: 404
        }
    }