<template>
  <div class="home">
    <Chart />
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
  }
};
</script>
