<template>
    <div v-bind:class="size" class="node-details" v-if="node && node.id">
        <img width="50px" height="50px" v-bind:src="`/img/a${node.group}.png`" />
        <div class="content">
            <div class="name">{{node.id}}</div>
            <div class="company">{{$store.getters.companies[node.group]}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["node", "size"]
};
</script>

<style lang='scss'>
.node-details {
  margin: 30px 0;
  justify-content: center;
  display: flex;
  .content {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    .name {
      font-size: 20px;
    }
    .company {
      font-size: 14px;
    }
  }
  &.small {
    margin: 0;
    img {
      width: 18px;
      height: 18px;
    }
    .content {
      padding: 0 3px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      .name {
        font-size: 8px;
      }
      .company {
        font-size: 6px;
      }
    }
  }
}
</style>
