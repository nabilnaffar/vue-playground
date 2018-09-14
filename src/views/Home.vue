<template>
  <div class="home">
    <Chart v-bind:nodes="$store.getters.devicesNodes"
            v-bind:links="$store.getters.devicesLinks" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Chart from "@/components/Chart.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Chart
  },
  mounted: function() {
    this.$store.dispatch("loadDevices");
  }
};
</script>
