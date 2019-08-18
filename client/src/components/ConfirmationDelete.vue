<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
          <button type="button" class="close" @click="closeConfirmation">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure want to delete this article ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeConfirmation">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteArticle">Delete</button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  methods : {
    closeConfirmation () {
      this.$emit('closeConfirmation')
    },
    deleteArticle () {
      this.$emit('deleteArticle')
    }
  }
}
</script>

<style>
.modal{
  display: unset;
}
.modal-title{
  color: #e63636;
}
</style>