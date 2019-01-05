<script>
  import TabContent from './tab-content.vue'

  export default {
    name: 'tabs',
    component: {
      TabContent
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    data () {
      return {
        panes: []
      }
    },
    methods: {
      onchange (index) {
        this.$emit('change', index)
      }
    },
    render () {
      return (
        <div class="tabs">
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
          <TabContent panes={this.panes}/>
        </div>
      )
    }
  }
</script>
<style lang="stylus" scoped>
  .tabs-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
    padding 0 20px
    background-color: pink
</style>
