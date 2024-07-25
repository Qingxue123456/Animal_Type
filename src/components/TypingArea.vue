<template>
    <!-- Showing Sentences -->
  <div class="showingArea">
    <div class="sentence">
        <span v-for="(char, index) in sentencesArray" :key="index" :class="getCharClass(index)">
        {{ char }}
        </span>
    </div>
  </div>

  <!-- Text Area -->
  <textarea cols="30" rows="3"
  ref="textArea"
  :disabled="disabled"
  v-model="localInputValue"
  @input="onInputChange"
  class="input_area"
  v-focusTextArea
  ></textarea>
</template>

<script>
export default {
    name: 'TypingArea',
    props: ['sentence', 'inputValue', 'disabled'],
    emits: ['inputChange','startGame'],
    data() {
        return {
            localInputValue: this.inputValue
        }
    },
    directives: {
        "focusTextArea": {
            mounted(el) {
                el.focus();
            }
        }
    },
    watch: {
        inputValue(newValue) {
            this.localInputValue = newValue;
        },
        localInputValue(newValue) {
            this.$emit('inputChange', newValue);
        }
    },
    computed: {
        sentencesArray() {
            return this.sentence.split('')
        }
    },
    methods: {
        // Change font color
        getCharClass(index) {
            if( index < this.localInputValue.length) {
                return this.localInputValue[index] === this.sentence[index] ? 'correct' : 'incorrect';
            }
            return '';
        }
    }
}
</script>

<style scoped>
.showingArea {
    margin: 20px auto;
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

.input_area {
    display: block;
    margin: 20px auto;
    padding: 20px 30px;
    width: 800px;
    height: 100px;
    background-color: aliceblue;
    color: rgba(0, 0, 0);
    font-size: 20px;
    font-weight:bolder;
    letter-spacing: 3px;
}

.correct {
    color: rgb(255, 196, 0);
}

.incorrect {
    color: red;
}
</style>