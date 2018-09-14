import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    devices: {
      nodes: [],
      links: []
    },
    groups: [
      { name: 0, value: true },
      { name: 1, value: true },
      { name: 2, value: true },
      { name: 3, value: true },
      { name: 4, value: true },
      { name: 5, value: true },
      { name: 6, value: true },
      { name: 7, value: true },
      { name: 8, value: true },
      { name: 9, value: true }
    ]
  },
  getters: {
    devicesNodes: state =>
      state.devices.nodes.filter(node => state.groups[node.group].value),
    devicesLinks: state => state.devices.links
    // .filter(link => {
    //   const nodeA = state.devices.nodes.find(node => node.id === link.source );
    //   const nodeB = state.devices.nodes.find(node => node.id === link.target );
    //   const res = nodeA && nodeB && state.groups[nodeA.group].value && state.groups[nodeB.group].value;
    //   console.log(res);
    //   return res;
    // })
  },
  mutations: {
    setDevices: (state, devices) => {
      state.devices = devices;
    },
    setCheckedGroup: (state, { id, value }) => {
      state.groups[id].value = value;
    }
  },
  actions: {
    loadDevices: ({ commit }) => {
      fetch("miserables.json")
        .then(r => r.json())
        .then(data => commit("setDevices", data));
    },
    checkGroup: function({ commit }, { name, isChecked }) {
      commit("setCheckedGroup", { id: name, value: isChecked });
    }
  }
});
