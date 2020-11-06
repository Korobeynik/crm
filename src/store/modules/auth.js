import axios from "axios"
export default {

  state: {
    isAuth: false,
    status: '',
    token:  JSON.parse(localStorage.getItem('token') || null),
    user: JSON.parse(localStorage.getItem('user') || null),
    domain: null
  },
  mutations: {
    authRequest(state){
      state.status = 'loading'
    },
    setToken(state, token){
      state.status = 'success'
      state.token = token
    },
    authError(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      localStorage.removeItem('user')
      document.location.reload()
    },
    setUser(state, user) {
      console.log(user)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('domain', JSON.stringify(user.company.domain))
        state.user = user
      }
    },
    registerSocial() {
      console.log('111')
    }
  },
  actions: {
    registerSocial({commit}, socialData) {
      console.log(socialData)
      return new Promise((resolve, reject) => {
        commit('registerSocial')
        let data = {
          email: socialData.email,
          provider: socialData.provider
        }
        console.log(data)
        axios.post(`https://gateway.esl.in.ua/api/v1/user/social`,  {data}, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })
          .then(resp => {
            console.log(resp.data)
            resolve(resp)
            const token = resp.data.data.access_token
            const user = resp.data.data.user
            console.log(token)
            localStorage.setItem('token', JSON.stringify(token))
            axios.defaults.headers.common['Authorization'] = token
            commit('setToken', token)
            commit('setUser', user)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    register({commit}, user){
      console.log(user.email)
      console.log(user.phone)
      return new Promise((resolve, reject) => {
        commit('authRequest')
        let data = ''
        if (user.email) {
          data = {
            email: user.email
          }
        } else if (user.phone) {
          data = {
            phone: user.phone
          }
        }
        axios.post('https://gateway.esl.in.ua/api/v1/user/register',  data, {
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          }
        })
          .then(resp => {
            console.log(resp.data)
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    login({commit}, user){
      console.log(user)
      return new Promise((resolve, reject) => {
        commit('authRequest')
        let data = ''
        if (user.email) {
          data = {
            email: user.email,
            password: user.password
          }
        } else if (user.phone) {
          data = {
            phone: user.phone,
            password: user.password
          }
        }
        axios.post('https://gateway.esl.in.ua/api/v1/user/login', {data: data})
        .then(resp => {
            console.log(resp.data)
            const token = resp.data.access_token
            const user = resp.data.user
            console.log(token)
            localStorage.setItem('token', JSON.stringify(token))
            axios.defaults.headers.common['Authorization'] = token
            commit('setToken', token)
            commit('setUser', user)
            resolve(resp)
          })
          .catch(err => {
            commit('authError')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    getUid() {
      return 77
    },
    logout({commit}){
      console.log("logout")
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    token: state => state.token,
    user: s => s.user,
    domain: s => s.domain
  }

}