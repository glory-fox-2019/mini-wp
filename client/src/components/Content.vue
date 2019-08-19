<template>
  <div id="content">
    <Card></Card>
  </div>
</template>

<script>
import Card from './Card';

export default {
  components: {
    Card
  },
  data: function () {
    return {
      
      dataCard: [
        {
          name: "oke"
        },
        {
          name: "oke"
        },
        {
          name: "oke"
        }
        ,
        {
          name: "oke"
        },
        {
          name: "oke"
        }
      ]
    }
  },
  created() {
    this.rowCard = parseInt(this.posts / 3);
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  #content {
    width: 100%;
    display: flex;
    /* overflow: hidden; */
    height: 100%;
  }

  #left-side-bar {
    flex-basis: 250px;
    border-right: 1px solid #c6c6c6;
  }

  #dashboard {
    /* height: 100%; */
    flex-grow: 1;
    padding: 50px;
    overflow: scroll;
  }
  #card-box {
    margin-top: 30px;
    display: flex;
  }

</style>