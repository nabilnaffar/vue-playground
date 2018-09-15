<template>
    <div class="filter-container">
        <Checkbox :name="'all'" :value="isAllCheched()" :onChange="e => selectAll(e.target.checked)">All: </Checkbox>
        <Checkbox
            :key="group.name" v-for="group in $store.state.groups"
            :name="group.name" :value="group.value" :onChange="e => onChange(group.name, e.target.checked)">
            <img width="18px" height="18px" v-bind:src="`img/a${group.name}.png`" /> : 
        </Checkbox>
    </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";

export default {
  components: {
    Checkbox
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
    }
  }
};
</script>

<style lang='scss'>
.filter-container {
  margin-bottom: 30px;
}
</style>
