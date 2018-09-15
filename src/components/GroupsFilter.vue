<template>
    <div class="filter-container">
        <Checkbox :name="'all'" :value="isAllCheched()" :onChange="e => selectAll(e.target.checked)">All: </Checkbox>
        <Checkbox
            :key="group.name" v-for="group in $store.state.groups"
            :name="group.name" :value="group.value" :onChange="e => onChange(group.name, e.target.checked)">
            <img width="18px" height="18px" v-bind:src="`img/a${group.name}.png`" /> : 
        </Checkbox>
        <div class="person-filter" v-if="$store.getters.selectedPersonDetails">
            <Details :node="$store.getters.selectedPersonDetails" size="small" />
            <button class="clear" v-on:click="clearSelectedPerson()">X</button> 
        </div>
    </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";
import Details from "@/components/Details.vue";

export default {
  components: {
    Checkbox,
    Details
  },
  methods: {
    onChange: function(name, isChecked) {
      this.$store.dispatch("checkGroup", { name, isChecked });
    },
    isAllCheched: function() {
      return this.$store.state.groups.reduce((isChecked, group) => {
        if (!isChecked || !group.value) {
          return false;
        }
        return true;
      }, true);
    },
    selectAll: function(value) {
      this.$store.dispatch("selectAllGroups", { value });
    },
    clearSelectedPerson: function() {
      this.$store.dispatch("setSelectedPerson", { id: undefined });
    }
  }
};
</script>

<style lang='scss'>
.filter-container {
  margin-bottom: 10px;
  height: 60px;
}
.person-filter {
  display: flex;
  justify-content: center;
  margin: 10px 0;

  .clear {
    border: none;
    text-decoration: none;
    background: none;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
