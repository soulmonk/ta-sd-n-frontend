<template>
  <div>
    <h5 class="text-xs-center">Bank</h5>
    <div v-if="sessionsInBank.length === 0" >
      No items are here... yet.
    </div>
    <md-list>
      <SessionItem v-for="(session) in sessionsInBank"
                   :session="session"
                   :action="'add'"
                   v-on:action="addToPlan"
                   v-on:remove="remove"
                   :key="session.id"></SessionItem>
    </md-list>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SessionItem from './SessionItem'
  import { ADD_TO_TRAINING_PLAN, DELETE_SESSION } from '../store/actions.type'

  export default {
    name: "BankListSessions",
    components: {SessionItem},
    props: {},
    computed: {
      ...mapGetters(["sessionsInBank"])
    },
    methods: {
      addToPlan(id) {
        this.$store.dispatch(ADD_TO_TRAINING_PLAN, id)
      },
      remove(id) {
        // TODO modal confirm action
        this.$store.dispatch(DELETE_SESSION, id)
      }
    }
  };
</script>
