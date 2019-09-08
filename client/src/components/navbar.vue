<template>

    <!-- Image and text -->
    <nav v-show="pages" class="navbar">
        <div class="container">
            <h3>Mini WP</h3>
            <div class="search">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search"/>
            </div>
             <div class=" d-flex">
                <div class="btn-group">
                    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="far fa-user-circle"></i>  
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <button @click="toDashboard" class="dropdown-item" type="button">Dashboard</button>
                        <!-- <button class="dropdown-item" type="button">Create Article</button> -->
                        <div class="dropdown-divider"></div>
                        <button @click="logout" class="dropdown-item" type="button">Logout</button>
                    </div>
                </div>
            </div>

        </div>
    </nav>
</template>

<script>
    export default {
        props: ['pages'],
        data() {
            return {

            }
        },
        methods: {
            toDashboard() {
                // console.log('masuk navbar');
                this.$emit('to-dashboard')
            },
            logout(){
                localStorage.clear()
                this.$emit('logout')
            }
        }
    }
</script>

<style scoped>
    .navbar {
        padding-right: 9rem;
        padding-left: 9rem;
        background-color: #4285F4;
        box-shadow: 0 0 2px #4285f4;
        color: white;
    }
    .navbar-barand {
        display: flex;
        color: white
    }
    .btn-group button i {
        font-size: 30px;
    }
    .btn-group .btn {
        padding: 0px 0px;
        background-color: transparent;
        color: white;
        border: none;
    }
    .btn-group .btn:hover {
       text-shadow: 0 0 10px grey;
        color: rgb(236, 236, 236);
        border: none;
    }
    .search input {
        height: 30px;
        opacity: 0.3; 
        width: 340px;  
    }
    .search input:hover {
        opacity: 0.7;
    }
</style>