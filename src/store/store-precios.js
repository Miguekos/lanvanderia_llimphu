import { axiosInstance } from "boot/axios";

const state = {
  get_list_service: [],
  get_list_service_id: [],
  activador: ""
};

const mutations = {
  get_list_service(state, payload) {
    state.get_list_service = payload;
  },
  get_list_service_id(state, payload) {
    state.get_list_service_id = payload;
  },
  activador(state, payload) {
    state.activador = payload;
  }
};

const actions = {
  async call_list_service({ commit }) {
    console.log("call_list_service");
    const response = await axiosInstance.get(`/precios`);
    commit("get_list_service", response.data);
  },
  async call_list_service_id({ commit }, payload) {
    console.log("call_list_service_id");
    const response = await axiosInstance.get(`/precios/${payload}`);
    commit("get_list_service_id", response.data);
  },
  async call_add_service({ commit }, payload) {
    console.log("call_add_service", payload);
    const response = await axiosInstance.post(`/precios`, payload);
    return response.data;
  }
};

const getters = {
  get_list_service(state) {
    return state.get_list_service;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
