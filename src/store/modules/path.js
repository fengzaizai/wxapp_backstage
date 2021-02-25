import Cookies from 'js-cookie'

const path = {
  state: {
    path: '/welcome',
    pagesize: 5,
    showImageUrl: 'https://fengzai.top:3033/images/icon/noimage.png',
    isShowPreview: false,
  },
  mutations: {
    SET_PATH: (state, path) => {
      if (path === '/addAdmin') {
        state.path = '/users'
      } else {
        state.path = path
      }
    },
    SET_PAGESIZE: (state, pagesize) => {
      state.pagesize = pagesize
    },
    SET_IMAGE_PATH: (state, showImageUrl) => {
      // console.log(showImageUrl)
      state.showImageUrl = showImageUrl
    },
    SET_IS_SHOW: (state,isShowPreview) => {
      state.isShowPreview = !state.isShowPreview
    },
  },
  actions: {
    //修改当前显示的路由
    setPath: ({
      commit
    }, path) => {
      commit('SET_PATH', path)
    },
    //修改页面显示条数的大小
    setPagesize: ({
      commit
    }, pagesize) => {
      commit('SET_PAGESIZE', pagesize)
    },
    //修改展示的图片路径
    setImagePath: ({
      commit
    }, showImageUrl) => {
      // console.log(showImageUrl)
      commit('SET_IMAGE_PATH', showImageUrl)
      commit('SET_IS_SHOW')
    },
    //修改是否展示图片
    setIsShow:({commit}) => {
      commit('SET_IS_SHOW')
    }
  }
}

export default path