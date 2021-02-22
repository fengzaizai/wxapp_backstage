import Vue from 'vue'
import vuex from 'vuex'

import path from './modules/path'

Vue.use(vuex)

const store = new vuex.Store({
  modules:{
    path,
  },
  getters:{

  }
})

export default store