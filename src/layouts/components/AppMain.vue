<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="css" scoped>
.app-main {
  min-height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
  padding: 1rem 1.2rem;
}
</style>
