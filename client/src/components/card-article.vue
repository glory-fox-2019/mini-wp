<template>
  <div class="card" style="max-width: 50%;  border: 0px">
    <a
      href="#"
      @click.prevent="clickDetail(article._id)"
      style="text-decoration: none; color: black"
    >
      <div class="card body">
        <div class="row no-gutters">
          <div class="col-5 d-flex align-items-center">
            <img v-bind:src="article.image" class="card-img" alt="thumb(400x300)" />
          </div>
          <div class="col-7 d-flex align-items-stretch">
            <div class="card-body">
              <h4 class="card-title">{{article.title}}</h4>
              <p class="card-text" v-html="article.content"> </p>
              <hr />
              <div class="card-meta">
                <span>
                  <i class="far fa-calendar-alt"></i> {{new Date(article.createdAt)}}
                </span>
              </div>
              <small class="card-meta float-right">{{article.UserId.username}}</small>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["article"],

  methods: {
    clickDetail(id) {
      this.$emit("go-to-detail", id);
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 2px 2px 9px 1px rgba(0, 0, 0, 0.54);
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 230px;
}

span {
  font-size: 10px;
}
</style>
