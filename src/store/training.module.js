import { TrainingService } from '@/common/api.service'
import {
  FETCH_SESSIONS,
  SESSION_CREATE,
  ADD_TO_TRAINING_PLAN,
  REMOVE_FROM_TRAINING_PLAN,
  RESET_TRAINING_PLAN,
  UPDATE_SORT_TRAINING_PLAN, COMPLETE_SESSION, DELETE_SESSION
} from './actions.type'
import { SET_SESSIONS, SET_TRAINING_ERROR } from './mutations.type'

const state = {
  sessions: {
    plan: [],
    bank: []
  },
  error: null
}

const getters = {
  sessionsInPlan (state) {
    return state.sessions.plan || []
  },
  sessionsInBank (state) {
    return state.sessions.bank || []
  },
  sessionError (state) {
    return state.error
  }
}

const actions = {
  [FETCH_SESSIONS] (context) {
    return TrainingService.getAll()
      .then(({ data: { data } }) => {
        context.commit(SET_SESSIONS, data)
        return data
      })
      .catch(({ response }) => {
        context.commit(SET_TRAINING_ERROR, response.data.errors)
      })
  },
  [SESSION_CREATE] (context, session) {
    return TrainingService.createSession(session)
      .then(({ data: { data } }) => {
        // todo set session in bank
        context.dispatch(FETCH_SESSIONS)
        return data
      })
      .catch(({ response }) => {
        context.commit(SET_TRAINING_ERROR, response.data.errors)
      })
  },
  [DELETE_SESSION] (context, id) {
    return TrainingService.removeSession(id)
      .then(({ data: { data } }) => {
        // todo set session in bank
        context.dispatch(FETCH_SESSIONS)
        return data
      })
      .catch(({ response }) => {
        context.commit(SET_TRAINING_ERROR, response.data.errors)
      })
  },
  [COMPLETE_SESSION] (context, id) {
    return TrainingService.completeSession(id)
      .then(({ data: { data } }) => {
        // todo set session in bank
        context.dispatch(FETCH_SESSIONS)
        return data
      })
      .catch(({ response }) => {
        context.commit(SET_TRAINING_ERROR, response.data.errors)
      })
  },
  [ADD_TO_TRAINING_PLAN] (context, id) {
    const curPlan = context.state.sessions.plan || [];
    const ids = curPlan.slice().sort((a, b) => a.priority - b.priority).map(({id}) => id).concat(id)
    return TrainingService.setPlanOrder(ids)
      .then(() => {
        context.dispatch(FETCH_SESSIONS)
      })
  },
  [REMOVE_FROM_TRAINING_PLAN] (context, id) {
    const curPlan = context.state.sessions.plan || [];
    const idx = curPlan.find(row => row.id === id)
    if (idx === -1) {
      context.commit(SET_TRAINING_ERROR, 'Could not find session in training plan')
      return Promise.resolve()
    }
    if (curPlan.length === 1) {
      return context.dispatch(RESET_TRAINING_PLAN)
    }
    const ids = curPlan.filter(row => row.id !== id).sort((a, b) => a.priority - b.priority).map(({id}) => id)
    return TrainingService.setPlanOrder(ids)
      .then(() => {
        context.dispatch(FETCH_SESSIONS)
      })
  },
  [RESET_TRAINING_PLAN] (context) {
    return TrainingService.resetPlan()
      .then(() => {
        context.dispatch(FETCH_SESSIONS)
      })
  },
  [UPDATE_SORT_TRAINING_PLAN] (context) {
    const curPlan = context.state.sessions.plan || [];
    return TrainingService.setPlanOrder(curPlan.map(({id}) => id))
      .then(() => {
        context.dispatch(FETCH_SESSIONS)
      })
  }
}

const mutations = {
  [SET_SESSIONS] (state, sessions) {
    state.error = null
    state.sessions = sessions
    // popup, notify
  },
  [SET_TRAINING_ERROR] (state, error) {
    state.error = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
