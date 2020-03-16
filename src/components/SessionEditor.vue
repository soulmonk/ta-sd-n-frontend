<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit(title, description)">
      <div class="card-block">
        <div class="form-group">
          <input type="text" class="form-control" v-model="title" placeholder="Write a title...">
        </div>
        <div class="form-group">
        <textarea
          class="form-control"
          v-model="description"
          placeholder="Write a description..."
          rows="3"
        >
        </textarea>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-sm btn-primary">Create Session</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { SESSION_CREATE } from '@/store/actions.type.js'

  export default {
    name: 'SessionEditor',
    components: {},
    props: {},
    data () {
      return {
        title: '',
        description: ''
      }
    },
    methods: {
      onSubmit (title, description) {
        this.$store
          .dispatch(SESSION_CREATE, { title, description })
          .then(() => {
            this.title = ''
            this.description = ''
            this.errors = {}
          })
      }
    }
  }
</script>
