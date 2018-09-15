import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: {
      0: "Spotify",
      1: "Hangouts",
      2: "Facebook",
      3: "Google",
      4: "Reddit",
      5: "Apple",
      6: "Dropbox",
      7: "Soundcloud",
      8: "Microsoft",
      9: "Instagram"
    },
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
    ],
    selectedNode: {}
  },
  getters: {
    companies: state => state.companies,
    devicesNodes: state =>
      state.devices.nodes.filter(node => state.groups[node.group].value),
    devicesLinks: state =>
      state.devices.links.filter(link => {
        return (
          link.source.group === undefined ||
          link.target.group === undefined ||
          (state.groups[link.source.group].value &&
            state.groups[link.target.group].value)
        );
      }),
    selectedNode: state => state.selectedNode
  },
  mutations: {
    setDevices: (state, devices) => {
      state.devices = devices;
    },
    setCheckedGroup: (state, { id, value }) => {
      state.groups[id].value = value;
    },
    selectAllGroups: (state, { value }) => {
      state.groups = state.groups.map(group => ({ ...group, value }));
    },
    setNode: (state, { node }) => {
      state.selectedNode = { id: node.id, group: node.group };
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
    },
    selectAllGroups: function({ commit }, { value }) {
      commit("selectAllGroups", { value });
    },
    setNode: function({ commit }, { node }) {
      commit("setNode", { node });
    }
  }
});
