<template>
  <md-list-item class="md-inset">

    <div class="md-list-item-text">
      <span>{{session.title}}</span>
      <span>{{session.description}}</span>
    </div>

    <md-button
      class="md-mini md-icon-button md-list-action md-raised"
      @click="$emit('action', session.id)"
      :class="toggleCheckButtonClasses"
    >
      <md-icon>{{action}}</md-icon>
    </md-button>
    <md-button class="md-mini md-icon-button md-list-action md-raised md-accent" @click="$emit('remove', session.id)">
      <md-icon>delete</md-icon>
    </md-button>
  </md-list-item>
</template>

<script>
  export default {
    name: 'SessionItem',
    computed: {
      toggleCheckButtonClasses() {
          return {
            'md-primary': this.action === 'check' && this.session.done
          }
      }
    },
    props: {
      session: { type: Object, required: true },
      action: {type: String, required: false}
    }
  }
</script>
