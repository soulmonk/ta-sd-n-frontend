import axios from 'axios'
import JwtService from '@/common/jwt.service'
import { AUTH_API_URL, TRAINING_API_URL } from '@/common/config'

export const AuthService = {
  init () {
    this._api = axios.create({
      baseURL: AUTH_API_URL + '/auth'
    })
  },

  setHeader () {
    this._api.defaults.headers.common['Authorization'] = 'Bearer ' + JwtService.getToken()
  },

  info () {
    return Promise.resolve({ data: {} })
  },

  login (credentials) {
    return this._api.post('/sign-in', credentials)
  },

  signUp (credentials) {
    return this._api.post('/sign-up', credentials)
  }

}

export const TrainingService = {

  init () {
    this._api = axios.create({
      baseURL: TRAINING_API_URL + '/training'
    })
  },

  setHeader () {
    this._api.defaults.headers.common['Authorization'] = 'Bearer ' + JwtService.getToken()
  },

  getAll () {
    return this._api.get('/session')
  },

  createSession (session) {
    return this._api.post('/session', session)
  },

  removeSession (id) {
    return this._api.delete('/session' + id)
  },

  completeSession (id) {
    return this._api.put('/session/' + id)
  },

  setPlanOrder (ids) {
    return this._api.put('/plan', {orders: ids})
  },

  resetPlan () {
    return this._api.delete('/plan')
  }
}

export function initApi () {
  AuthService.init()
  TrainingService.init()
}

export function updateHeader () {
  AuthService.setHeader()
  TrainingService.setHeader()
}

export default { initApi, updateHeader, AuthService, TrainingService }

