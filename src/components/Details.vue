<template>
    <div class="node-details" v-if="$store.getters.selectedNode.id !== undefined">
        <img width="50px" height="50px" v-bind:src="`/img/a${$store.getters.selectedNode.group}.png`" />
        <div class="content">
            <div class="name">{{$store.getters.selectedNode.id}}</div>
            <div class="company">{{$store.getters.companies[$store.getters.selectedNode.group]}}</div>
        </div>
    </div>
</template>

<script>
export default {};
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
}
</style>
