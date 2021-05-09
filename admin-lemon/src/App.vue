<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    created() {
        const userInfo = JSON.parse(localStorage.getItem('sso:user:login'));
        console.log('deef', userInfo);
        if (userInfo) {
            this.$store.commit('sso:user:login', userInfo);
        } else {
            this.$router.push({ path: '/login' });
        }
    }
}
</script>

<style>
</style>
