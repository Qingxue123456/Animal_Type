<template>
  <div class="App" v-loading="isLoading">
    <GlobalMusicPlayer />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading:false
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.App {
  height: 800px;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
}
.loading:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff url(../public/image&video/loading.gif) no-repeat center;
}
</style>