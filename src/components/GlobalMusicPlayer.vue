<template>
  <div style="display: none;">
  <!-- Background Music -->
  <audio ref="musicPlayer" src="music/Arctic_Dreams.mp3" loop preload="auto"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
    ...mapState('music', {
      isPlaying: state => state.isPlaying
    })
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        this.$refs.musicPlayer.play();
      } else {
        this.$refs.musicPlayer.pause();
      }
    }
  },
  mounted() {
    if (this.isPlaying) {
      this.$refs.musicPlayer.play();
    }
  }

}
</script>

<style>

</style>