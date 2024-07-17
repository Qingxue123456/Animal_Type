const state = {
    isPlaying: false // 初始状态为未播放
  };
  
  const mutations = {
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    }
  };
  
  const actions = {
    playMusic({ commit }) {
      commit('play');
    },
    pauseMusic({ commit }) {
      commit('pause');
    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  };
  