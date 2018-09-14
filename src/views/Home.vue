<template>
  <div class="home">
    <GroupsFilter />
    <Chart v-bind:nodes="$store.getters.devicesNodes"
            v-bind:links="$store.getters.devicesLinks" />
    <Details />

  </div>
</template>

<script>
// @ is an alias to /src

import Chart from "@/components/Chart.vue";
import GroupsFilter from "@/components/GroupsFilter.vue";
import Details from "@/components/Details.vue";

export default {
  name: "home",
  components: {
    Chart,
    GroupsFilter,
    Details
  },
  mounted: function() {
    this.$store.dispatch("loadDevices");
  }
};
</script>
