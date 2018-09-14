import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    devices: {
      nodes: [],
      links: []
    }
  },
  getters: {
    devicesNodes: state => state.devices.nodes,
    devicesLinks: state => state.devices.links
  },
  mutations: {
    setDevices: (state, devices) => {
      state.devices = devices;
    }
  },
  actions: {
    loadDevices: ({ commit }) => {
      fetch("miserables.json")
        .then(r => r.json())
        .then(data => commit("setDevices", data));
    }
  }
});
