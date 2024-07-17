<template>
  <div class="newGame">
    <!-- Pictures -->
    <div class="picture">
      <img id="leftImage" :style="{ width: leftWidth + '%'}" src="image&video/left_1.jpg" alt="Left Image">
      <img id="rightImage" :style="{ width: rightWidth + '%'}" src="image&video/right_1.webp" alt="Right Image">
    </div>
      <div class="zIndex_1">
        <div class="header">
          <div class="title">Animal Type</div>
        </div>
        <div class="main">
          <!-- Music -->
            <div class="music" @click="controlMusic">
            <i :class="['iconfont', isPlaying ? 'icon-musicfill' : 'icon-musicforbidfill']"></i>
          </div>
        </div>
          <!-- Game Level -->
          <div class="gameLevel" v-if="!isGameStarted">
            <div class="gameLevelFont" :class="{ 'blink-text': isBlinking }">Please select a game level.</div>
            <div class="button-container">
              <div class="button" v-for="index in buttons" :key="index">
                <button @click="startGame(index)">{{ index }}</button>
              </div>
            </div>
            <div class="hint">You need to correctly type the words on the screen in order, to help the polar bear on the left protect the Arctic ice caps!</div>
          </div>
          <!-- Play Game -->
          <PlayGame 
          v-if="isGameStarted" 
          :level="selectedLevel"
          :leftWidth="leftWidth"
          :rightWidth="rightWidth"
          :isGameStarted="isGameStarted"
          @currentlyType="leftLargen"
          @failType="rightLargen"
          @showLevelPage="onShowLevelPage"
          ></PlayGame>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PlayGame from '@/components/PlayGame.vue';

export default {
  name: 'NewGame',
  components: {
    PlayGame
  },
  style: `
    @import '@/assets/styles/component-specific-styles.css';
  `,
  // Music
  computed: {
    ...mapState('music', {
      isPlaying: state => state.isPlaying
    })
  },
  data() {
    return {
      // Picture
      leftWidth: 50,
      rightWidth: 50,
      // Button
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      // Font flicker
      isBlinking: false,
      // Play Game
      isGameStarted: false,
      selectedLevel: null,
    }
  },
  methods: {

    // Change Picture
    // Currently type one sentence
    leftLargen() {
      this.leftWidth += 5;
      this.rightWidth -= 5;
      if (this.leftWidth > 100) { this.leftWidth = 100 }
    },
    // fail to type one sentence
    rightLargen() {
      this.leftWidth -= 12.5;
      this.rightWidth += 12.5;
      if (this.rightWidth > 100) { this.rightWidth = 100 }
    },

    // Music
    ...mapActions('music', ['playMusic', 'pauseMusic']),
    controlMusic() {
      if (this.isPlaying) {
        this.pauseMusic();
        console.log('pause music');
      } else {
        this.playMusic();
        console.log('play music');
      }
    },

    // Font flicker
    startBlinking() {
      this.isBlinking = !this.isBlinking;
    },

    // Play Game
    startGame(index) {
      this.selectedLevel = index;
      this.isGameStarted = true;
      this.leftWidth = 50;
      this.rightWidth = 50;
    },

    // Show level Page
    onShowLevelPage() {
      this.isGameStarted = false;
    }
  },
  mounted() {
    setInterval(this.startBlinking, 5000);
  }
}
</script>

<style scoped>
.newGame {
  height: auto;
  text-align: center;;
  color:white ;
}

.picture {
  position: absolute;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}
#leftImage {
  height: 100%;
  object-fit: cover;
  object-position: left;
}
#rightImage {
  height: 100%;
  width: 50%;
  object-fit: cover;
  object-position: right;
}
.iconfont {
  display: flex;
  z-index: 1;
}
.title {
  color: aliceblue;
  height: 100px;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 4px;
  z-index: 1;
}
.newGame .main {
  display: flex;
  justify-content: space-around;
}

.newGame .left {
  align-self: flex-start;
}

.newGame .right {
  align-self: flex-end;
}

/* Game Level */
.gameLevel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

/* Font flicker */
@keyframes blink {
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

.gameLevelFont {
  color: aliceblue;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 4px;
  margin-top: 10px;
  margin-bottom: 110px;
  z-index: 1;
  animation: blink 1s infinite;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 30px 50px; 
  justify-items: center; 
  align-items: center;
  z-index: 1;
}

.button button {
  /* Box */
  font-size: 24px; 
  padding: 10px 20px; 
  text-align: center; 
  width: 100px; 
  height: 60px; 
  cursor:pointer;
  transition: background-color 0.3s;
  border-radius: 40%;
  background-color: aliceblue;
  border:none ;
  box-shadow: #000000 ;
  box-shadow: 0 2px 4px #000000;
  /* Font */
  font-weight: bold;
  color: rgb(96, 96, 96);
}

.button button:hover {
  background-color: bisque;
}

.gameLevel .hint{
  width: 800px;
  height: 100px;
  background-color: rgb(189, 183, 183,0.5);
  color: aliceblue;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 4px;
  margin-top: 50px;
  z-index: 1;
  align-content: center;
}
</style>