<template>
  <router-view></router-view>
  <FooterPage></FooterPage>
</template>

<script>
import FooterPage from '@/components/FooterPage.vue';

export default {
  components: {
    FooterPage,
  },
};
</script>
<style>
#app {
  font-family:'Roboto', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
