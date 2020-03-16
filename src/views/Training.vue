<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Training</h1>
      </div>
    </div>
    <div class="container page" v-if="!isAuthenticated">
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Please login to continue
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="container page" v-if="isAuthenticated">
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <SessionEditor></SessionEditor>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-xs-6">
          <PlanListSessions></PlanListSessions>
        </div>
        <div class="col-md-6 col-xs-6">
          <BankListSessions></BankListSessions>
        </div>
      </div>
    </div>

    <md-snackbar :md-position="'center'" :md-duration="5000" :md-active.sync="showError" md-persistent>
      <span v-if="sessionError">{{sessionError | error}}</span>
      <md-button class="md-primary" @click="showError = false">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { FETCH_SESSIONS } from '@/store/actions.type'
  import SessionEditor from '@/components/SessionEditor'
  import BankListSessions from '../components/BankListSessions'
  import PlanListSessions from '../components/PlanListSessions'

  export default {
    name: 'Training',
    components: {
      SessionEditor,
      BankListSessions,
      PlanListSessions
    },
    mounted () {
      this.fetchSessions()
    },
    data: () => ({
      showError: false
    }),
    watch: {
      sessionError () {
        this.showError = true;
      }
    },
    methods: {
      fetchSessions () {
        if (!this.isAuthenticated) {
          return
        }
        this.$store.dispatch(FETCH_SESSIONS)
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'sessionError'])
    }
  }
</script>
