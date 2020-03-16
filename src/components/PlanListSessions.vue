<template>
  <div>
    <h5 class="text-xs-center">Plan</h5>
    <md-list>
      <md-button
        class="md-primary md-list-action"
        @click="reset"
      >
        Reset plan
      </md-button>
      <div v-if="sessionsInPlan.length === 0">
        No session are here... yet.
      </div>
      <draggable :list="sessionsInPlan" :component-data="getComponentData()">
        <SessionItem v-for="session in sessionsInPlan"
                     :session="session"
                     :action="'check'"
                     v-on:action="complete"
                     v-on:remove="remove"
                     :key="session.id"></SessionItem>
      </draggable>
    </md-list>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import { mapGetters } from 'vuex'
  import SessionItem from './SessionItem'
  import { COMPLETE_SESSION, REMOVE_FROM_TRAINING_PLAN, RESET_TRAINING_PLAN, UPDATE_SORT_TRAINING_PLAN } from '../store/actions.type'

  export default {
    name: 'PlanListSessions',
    components: { draggable, SessionItem },
    props: {},

    computed: {
      ...mapGetters(['sessionsInPlan'])
    },
    methods: {
      handleChange() {
        this.$store.dispatch(UPDATE_SORT_TRAINING_PLAN)
      },
      inputChanged(value) {
        this.items = value;
      },
      getComponentData() {
        return {
          on: {
            end: this.handleChange,
            input: this.inputChanged
          },
          attrs:{
            wrap: true
          },
          props: {
            value: this.items
          }
        };
      },
      complete (id) {
        this.$store.dispatch(COMPLETE_SESSION, id)
      },
      remove (id) {
        // TODO modal confirm action
        this.$store.dispatch(REMOVE_FROM_TRAINING_PLAN, id)
      },
      reset (id) {
        // TODO modal confirm action
        this.$store.dispatch(RESET_TRAINING_PLAN, id)
      }
    }
  }
</script>
