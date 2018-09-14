<template>
  <div class="home">
    <GroupsFilter />
    <Chart v-bind:nodes="$store.getters.devicesNodes"
            v-bind:links="$store.getters.devicesLinks" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Chart from "@/components/Chart.vue";
import GroupsFilter from "@/components/GroupsFilter.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Chart,
    GroupsFilter
  },
  mounted: function() {
    this.$store.dispatch("loadDevices");
  }
};
</script>
