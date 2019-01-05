<script>
  export default {
    props: {
      panes: {
        type: Array,
        required: true
      }
    },
    render () {
      const content = this.panes.map(item => {
        return item.active ? item.$slots.default : null
      })
      return (
        <div class="tab-container">
          {content}
        </div>
      )
    }
  }
</script>
