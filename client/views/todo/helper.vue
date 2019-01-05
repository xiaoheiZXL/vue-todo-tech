<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <button class="show-msg-btn" @click="showMsg">showMessage</button>
    <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    unFinishedTodoLength () {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    showMsg () {
      this.$notify({
        content: '$notify msg',
        btnText: 'close'
      })
    },
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper{
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing: antialiased
}
.left, .clear, .tabs{
  padding 0 10px
  box-sizing border-box
}
.left, .clear{
  width 150px
}
.left{
  text-align left
}
.show-msg-btn{
  outline: none
  border: none
  cursor: pointer
}
.clear{
  text-align right
  cursor pointer
}
.tabs{
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.actived{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
    }
  }
}
</style>


