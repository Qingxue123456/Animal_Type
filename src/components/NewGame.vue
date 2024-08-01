<template>
  <div class="newGame">
    <!-- Background -->
    <div class="backGround">
      <img class="threeAnimal" src="image&video/cover_1.jpg" alt="picture" v-if="!isGameStarted">
      <img id="leftImage" :style="{ width: leftWidth + '%'}" :src="leftImageSrc" alt="Left Image" v-if="isGameStarted">
      <img id="rightImage" :style="{ width: rightWidth + '%'}" :src="rightImageSrc" alt="Right Image" v-if="isGameStarted">
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
              <div class="polarBear">
                <div class="animalName">Polar Bear</div>
                <div>
                  <button  @click="startGame(1)">1</button>
                  <button  @click="startGame(2)">2</button>
                  <button  @click="startGame(3)">3</button>
                </div>
              </div>
              <div class="dolphin">
                <div class="animalName">Dolphin</div>
                <div>
                  <button  @click="startGame(4)">4</button>
                  <button  @click="startGame(5)">5</button>
                  <button  @click="startGame(6)">6</button>
                </div>
              </div>
              <div class="penguin">
                <div class="animalName">Penguin</div>
                <div>
                  <button  @click="startGame(7)">7</button>
                  <button  @click="startGame(8)">8</button>
                  <button  @click="startGame(9)">9</button>
                </div>
              </div>
            </div>
            <div class="hint">You need to correctly type the words on the screen in order, to help animals on the left protect the Arctic ice caps!</div>
          </div>
          <!-- Play Game -->
          <PlayGame 
          v-if="isGameStarted" 
          :level="selectedLevel"
          :leftWidth="leftWidth"
          :rightWidth="rightWidth"
          :isGameStarted="isGameStarted"
          :selectTime="sendDifficulty"
          @showLevelPage="onShowLevelPage"
          @failType="rightLargen"
          @currentlyType="leftLargen"
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

  computed: {
    // Music
    ...mapState('music', {
      isPlaying: state => state.isPlaying
    }),

    // Background
    
    leftImageSrc() {
        if (this.selectedLevel === 1 || this.selectedLevel === 2 || this.selectedLevel === 3) {
            return 'image&video/left_1.jpg';
        } else if (this.selectedLevel === 4 || this.selectedLevel === 5 || this.selectedLevel === 6) {
            return 'image&video/left_2.webp';
        } else if (this.selectedLevel === 7 || this.selectedLevel === 8 || this.selectedLevel === 9) {
            return 'image&video/left_3.webp';
        }
        return 'image&video/cover_1';
    },
    rightImageSrc() {
        if (this.selectedLevel === 1 || this.selectedLevel === 2 || this.selectedLevel === 3) {
            return 'image&video/right_1.webp';
        } else if (this.selectedLevel === 4 || this.selectedLevel === 5 || this.selectedLevel === 6) {
            return 'image&video/right_2.jpg';
        } else if (this.selectedLevel === 7 || this.selectedLevel === 8 || this.selectedLevel === 9) {
            return 'image&video/right_3.jpg';
        }
        return 'image&video/cover_1';
    }
  },

  data() {
    return {
      // Font flicker
      isBlinking: false,
      // Play Game
      isGameStarted: false,
      selectedLevel: null,
      sendDifficulty: this.$route.query.difficulty,

      // Picture
      leftWidth: 50,
      rightWidth: 50,
    }
  },
  methods: {
    // Change Picture
    // Currently type one sentence
    leftLargen() {
    this.leftWidth += 5;
    this.rightWidth -= 5;
    if (this.leftWidth > 100) { 
      this.leftWidth = 100 ;
      this.rightWidth = 0;
    }
    },
    // fail to type one sentence
    rightLargen() {
    this.leftWidth -= 20;
    this.rightWidth += 20;
    if (this.rightWidth > 100) { 
      this.rightWidth = 100 ;
      this.leftWidth = 0;
    }
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
  height: 100vh;
  text-align: center;;
  color:white ;
  width: 100%;
}

/* Background */
.backGround {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  overflow: hidden;
  z-index: -1;
  object-fit: cover;
}

.backGround .threeAnimal {
  min-width: 100%; 
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

/* Music */
.iconfont {
  display: flex;
  z-index: 1;
}

/* Game Level */
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
  margin-bottom: 40px;
  z-index: 1;
  animation: blink 1s infinite;
}

.button-container {
  height: 350px;
  width: 800px;
  justify-items: center; 
  align-items: center;
  z-index: 1;
}

.animalName {
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 2px;
  align-content: center;
}

button {
  /* Box */
  margin: 5px 50px;
  font-size: 24px; 
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

button:hover {
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
  margin-top: 20px;
  z-index: 1;
  align-content: center;
}
</style>