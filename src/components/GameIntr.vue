<template>
  <div class="gameIntro">
    <div class="intro">
      <br>
      <br>
      <div class="title">Game Introduction</div>
      <br>
      <div class="content">
        <br>
        <div>"Animal Type" is a delightful typing game full of childlike wonder. In this game, you need to correctly type the words that appear on the screen in sequence. Each time you successfully type a word, the polar bear's world expands. When the polar bear's world covers the entire screen, you win the game.</div>
        <br>
        <div>However, if you fail to complete the words within the given time, the polluted world will encroach upon the polar bear's space. If the polluted world takes over the entire screen, it's game over. We hope you do your best to protect our world and achieve sustainable development.</div>
      </div>
      <button @click="backToPage">Return</button>
    </div>
  </div>

</template>

<script>
export default {
    methods: {
      backToPage () {
            this.$router.push({ name:'FirstModule'});
        }
    }
}
</script>

<style scoped>
.gameIntro {
    height: 800px;
    background: url('/public/image&video/title.webp') center center/cover no-repeat;
    color:white ;
    text-align: center;
    height: 100vh;
    width: 100%;
}
.intro {
  height: 800px;
  width: 600px;
  margin: auto; 
}
.title {
  font-size: 60px;
  padding: 100px auto; 
}
.content {
  width: 550px;
  height: 400px;
  margin: 10px auto;
  background-color: rgb(189, 183, 183,0.5);
  font-size: 20px;
}
button{
  height: 50px;
  width: 90px;
  background-color: #4CAF50; 
  border: none; 
  color: white; 
  font-weight: bold;
  font-size: 30px;
  text-align: center; 
  text-decoration: none; 
  font-size: 16px; 
  margin: 4px 2px; 
  cursor: pointer; 
  border-radius: 12px; 
  transition: background-color 0.3s ease; 
}
button:hover {
  text-decoration: underline;
  color: bisque;
  cursor:pointer;
}
</style>