<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Success</h5>
          <button type="button" class="close" @click="closeNotification">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>You are registered succesfully</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeNotification">Close</button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  methods : {
    closeNotification () {
      this.$emit('closeNotification')
    }
  }
}
</script>

<style>
.modal{
  display: unset;
}
.modal-title{
  color: #83df7a;
}
</style>