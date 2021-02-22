import Cookies from 'js-cookie'

const path = {
  state: {
    path:'/welcome',
    pagesize:5,
  },
  mutations: {
    SET_PATH: (state,path) => {
      if(path === '/addAdmin'){
        state.path = '/users'
      }else{
        state.path = path
      }
    },
    SET_PAGESIZE: (state,pagesize) => {
      state.pagesize = pagesize
    },
  },
  actions: {
    setPath: ({ commit },path) => {
      commit('SET_PATH',path)
    },
    setPagesize:({commit},pagesize) => {
      commit('SET_PAGESIZE',pagesize)
    }
  }
}

export default path
