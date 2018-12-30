<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <router-link to="/todo"> todo</router-link>
        <router-link to="/login"> login</router-link>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'

  export default {
    metaInfo: {
      title: 'AppPage'
    },
    components: {
      Header,
      Footer
    },
    created () {
      // this.updateCountAsync({
      //   num: 10
      // })
      // let i = 1
      // setInterval(() => {
      //   // this.$store.commit('updateCount', i++)
      //   // this.updateCount(i++)
      // }, 1000)
      // 模块化调用
      // this['a/updateCount1'](11)
    },
    methods: {
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount', 'a/updateCount1'])
    },
    computed: {
      ...mapState({}),
      // fullName () {
      //   return this.$store.getters.fullName
      // },
      ...mapGetters({
        'fullName': 'fullName'
      })
      // count () {
      //   return this.$store.state.count
      // }
    }
  }
</script>

<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>


