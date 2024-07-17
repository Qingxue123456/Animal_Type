<template>
  <div class="firstModule">
    <!-- Background Video -->
    <div class="background-video-container">
      <video autoplay muted loop>
        <source src="image&video/video.mp4" type="video/mp4" />
      </video>
    </div>
    <!-- Title -->
    <div class="title">
      <div>Animal</div>
      <div>TYPE</div>
    </div>
    <div class="mainBlock"></div>
    <div class="option">
      <!-- New Game -->
      <div><router-link to="/new-game">New Game</router-link></div>
      <!-- Difficulat Selection -->
      <div @click="showDifficultySelect">Difficulty Selection</div>
      <!-- Game Introduction -->
      <div><router-link to="/game-intro">Game Introduction</router-link></div>
      <!-- Music -->
      <div @click="musicSelect">Music</div>
    </div>
    <div class="endBlock"></div>
    <div class="footer">Copyright © 2024 Animal Type. All rights reserved.</div>

  </div>

</template>

<script>
import Swal from 'sweetalert2'; 
import '../assets/style.css'; 
import { mapState, mapActions } from 'vuex';

export default {
  name: 'FirstModule',
  computed: {
    ...mapState('music', {
      isPlaying: state => state.isPlaying
    })
  },
  methods: {
    // Difficulty
    showDifficultySelect () {
      Swal.fire({
        title: "Select Difficulty",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Easy",
        denyButtonText: `Difficult`,
        customClass: {
          popup: 'my-swal',
          title: 'my-swal-title',
          content: 'my-swal-content',
          confirmButton: 'my-swal-confirm-button',
          cancelButton: 'my-swal-cancel-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Easy difficulty selected');
        } else if (result.isDenied) {
          console.log('Difficult difficulty selected');
        }
      });
    },
    // Music
    ...mapActions('music', ['playMusic', 'pauseMusic']),
    musicSelect () {
      Swal.fire({
        title: "Would you like to turn on the music?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
        customClass: {
          popup: 'my-swal',
          title: 'my-swal-title',
          content: 'my-swal-content',
          confirmButton: 'my-swal-confirm-button',
          cancelButton: 'my-swal-cancel-button'
        }
      }).then((result) => {
        // Choose yes
        if (result.isConfirmed) {
          console.log('Turn off the music');
          this.playMusic();
        // Choose no
        } else if (result.isDenied) {
          console.log('Turn on the music');
          this.pauseMusic();
        }
      });
    }
  },
}
</script>


<style scoped>
.firstModule {
    height: 800px;
    text-align: center;
    color:white ;
}
.background-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; 
  overflow: hidden;
  z-index: -1;
  object-fit: cover;
}
.background-video-container video {
  min-width: 100%; 
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  height: 220px;
  font-size: 110px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 4px;
}
.mainBlock {
  height: 250px;
}
.option {
  height: 60px;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 2px;
  color:white ;
  text-decoration: underline;
  color: bisque;
  cursor:pointer;
}
.option a {
  color: inherit;
}
a:hover {
  text-decoration: underline;
  color: bisque;
  cursor:pointer;
}
.endBlock {
  height: 350px;
}
.footer {
  font-size: 10px;
  font-weight: bold;
  color: black;
}

</style>