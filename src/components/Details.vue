<template>
    <div class="node-details" v-if="$store.getters.selectedNode.id !== undefined">
        <img width="50px" height="50px" v-bind:src="`/img/a${$store.getters.selectedNode.group}.png`" />
        <div class="content">
            <div>{{$store.getters.selectedNode.id}}</div>
            <div>{{$store.getters.selectedNode.group}}</div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.node-details {
  justify-content: center;
  display: flex;
  .content {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
