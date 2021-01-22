import { axiosInstance } from "boot/axios";

const state = {
  get_service: [],
  activador: ""
};

const mutations = {
  get_service(state, payload) {
    state.get_service = payload;
  },
  activador(state, payload) {
    state.activador = payload;
  }
};

const actions = {
  async call_service({ commit }) {
    console.log("call_list_service");
    const response = await axiosInstance.get(`/registros`);
    commit("get_service", response.data);
  },
  async call_add_service({ commit }, payload) {
    console.log("call_add_service", payload);
    const response = await axiosInstance.post(`/registros`, payload);
    return response.data;
  }
};

const getters = {
  get_service(state) {
    return state.get_service;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
