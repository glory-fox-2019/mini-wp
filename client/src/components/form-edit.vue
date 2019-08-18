<template>
    <div v-show="false" class="form-edit col-md-10 ">
        <div class="col-md-9">
            <h2>Edit your article</h2>
            <div class="edit-title">
                <input type="text" value="" placeholder="title ....">
            </div>

            <div class="mt-5 mb-5">
            <wysiwyg type="text" class="mt-5"></wysiwyg>
            </div>

            <div class="button-dashboard-edit">
                <button type="button" class="btn btn-primary">Save</button>
                <!-- <button type="button" class="btn btn-primary">Cancel</button> -->
            </div>
        </div>
        <div class="col-md-3">
            <!-- <h4>Lorem ipsum, dolor sit amet</h4>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque sapiente porro, tempore pariatur necessitatibus repellendus quia neque blanditiis iste asperiores molestiae. Tempore sequi earum dicta, dolores quasi accusantium quo. -->
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .form-edit {
        display: flex;
    }
</style>