const getters = {
  userInfo: state => {
    if (JSON.stringify(state.user.userInfo) === '{}') {
      return JSON.parse(window.sessionStorage.getItem('userInfo'))
    }
    return state.user.userInfo
  }
}

export default getters
