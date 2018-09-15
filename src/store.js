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
    selectedNode: {},
    selectedPerson: undefined
  },
  getters: {
    companies: state => state.companies,
    devicesNodes: (state, getters) =>
      state.devices.nodes
        .filter(node => state.groups[node.group].value)
        .filter(node => {
          if (!state.selectedPerson) {
            return true;
          }
          return getters.devicesLinks.find(
            link => link.target.id === node.id || link.source.id === node.id
          );
        }),
    devicesLinks: state =>
      state.devices.links
        .filter(link => {
          return (
            link.source.group === undefined ||
            link.target.group === undefined ||
            (state.groups[link.source.group].value &&
              state.groups[link.target.group].value)
          );
        })
        .filter(link => {
          if (!state.selectedPerson) return true;
          return (
            state.selectedPerson === link.target.id ||
            state.selectedPerson === link.source.id
          );
        }),
    selectedNode: state => state.selectedNode,
    selectedPersonDetails: state => {
      return (
        state.selectedPerson &&
        state.devices.nodes.find(node => node.id === state.selectedPerson)
      );
    }
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
    },
    setSelectedPerson: function(state, { id }) {
      state.selectedPerson = id;
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
    },
    setSelectedPerson: function({ commit }, { id }) {
      commit("setSelectedPerson", { id });
    }
  }
});
