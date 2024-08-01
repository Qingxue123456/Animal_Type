<template>
  <div class="playGame" v-if="!gameOver">
    <!-- Timer -->
    <div class="timer">{{ timeLeft }}</div>
    <!-- Game Area -->
    <div class="gameArea">
        <typingArea
        :sentence="currentSentence"
        :inputValue="inputValue"
        @inputChange="handleInputChange"
        :disabled="gameOver"
        ></typingArea>
        <div class="button">
            <button @click="startGame">Restart</button>
            <button @click="interruptGame">End Game</button>
        </div>
    </div>
  </div>
    <div class="finishGame" v-if="gameOver">
        <div class="result">{{ success ? successed : failed }}</div>
        <div class="content">
            <div>Accuracy: {{ accuracy }}%</div>
            <div>Errors: {{ totalErrors }}</div>
            <div>Characters Per Minute: {{ cpm }}</div>
        </div>
        <button @click="returnNewGame">Return</button>
    </div>
</template>

<script>
import { sentencesArray } from '@/sentences';
import TypingArea from './TypingArea.vue';

export default {
    name: 'PlayGame',
    components: {
        TypingArea
    },
    props: ['level','isGameStarted','selectTime','leftWidth','rightWidth'],
    emits: ['showLevelPage','failType','currentlyType'],
    data() {
        return {
            // Sentences
            sentencesArray,
            order: 1,

            // Timer
            timeLimit: null,
            timeLeft: null,
            timer: null,
            totalTime: 0,

            // Game
            currentSentence: "",
            inputValue: "",

            // Game over
            gameOver: false,
            successed: "Congratulations! You successfully completed the level and protected the environment, the habitat of many animals, from pollution by gasoline and other contaminants.",
            failed:"Unfortunately, you didn't complete the level, and the habitat of many animals ended up being polluted by gasoline and other contaminants.",

            // Result
            success: false,
            totalErrors: 0,
            characterTyped: 0,
            accuracy: 100,
            cpm: 0, // characters per minute
        }
    },
    methods: {
        // Game
        startGame() {
            this.timeLimit = +this.selectTime;
            this.resetValues();
            this.updateSentence();
            this.timer = setInterval(this.updateTimer, 1000);
            this.endGameTimer = setInterval(this.endGame, 200);
        },

        resetValues() {
            this.order = 1;
            this.timeLeft = +this.timeLimit;
            this.totalTime = 0;
            this.totalErrors = 0;
            this.characterTyped = 0;
            this.accuracy = 100;
            this.cpm = 0;
            this.inputValue = "";
            this.gameOver = false;
            this.success = false;
            clearInterval(this.timer);
            clearInterval(this.endGameTimer);
        },
        
        // Timer
        updateTimer() {
            if (this.timeLeft > 0) {
                this.timeLeft --;
            } else if (this.timeLeft === 0) {
                this.$emit('failType');
                this.order ++;
                this.updateSentence();
                this.inputValue = "";
                clearInterval(this.timer);
                this.timeLeft = this.timeLimit;
                this.timer = setInterval(this.updateTimer, 1000);
                this.totalTime += this.timeLimit;
            } 
        },

        // Whether to End Game
        endGame() {
            // fail four times
            if( this.rightWidth === 100) {
                this.finishGame();
            }
            // 
            if(this.leftWidth === 100) {
                this.success = true;
                this.finishGame();
            }
        },

        // Sentence
        updateSentence() {
            const filteredlevel = this.sentencesArray.filter(item => item.id === this.level);
            if ( filteredlevel.length > 0) {
               const filteredSentence = filteredlevel.filter(item => item.order === this.order);
               if (filteredSentence) {
                this.currentSentence = filteredSentence[0].sentence;
               } 
            }
        },

        handleInputChange(newInputValue) {
            this.inputValue = newInputValue;
            this.processCurrentText();
        },

        processCurrentText() {
            const inputArray = this.inputValue.split('');
            const sentenceArray = this.currentSentence.split('');
            let errors = 0;

            this.characterTyped ++;

            if( inputArray[inputArray.length - 1] !== sentenceArray[inputArray.length - 1]) {
                errors++;
            }

            this.totalErrors += errors;

            const correctCharacters = this.characterTyped - this.totalErrors;
            this.accuracy =  Math.round((correctCharacters / this.characterTyped) * 100);
            if (this.accuracy < 0) {
                this.accuracy = 0;
            }

            // Currently type one sentence
            if(this.inputValue === this.currentSentence) {
                this.totalTime = this.totalTime + this.timeLimit - this.timeLeft;
                this.order ++;
                this.updateSentence();
                this.inputValue = "";
                this.$emit('currentlyType');
                clearInterval(this.timer);
                this.timeLeft = this.timeLimit;
                this.timer = setInterval(this.updateTimer, 1000);

                // Successly Pass Game
                if (this.order === 10) {
                    this.order = 1 ;
                }
            }
        },

        // Interrupt Game
        interruptGame() {
            this.totalTime = this.totalTime + this.timeLimit - this.timeLeft;
            this.finishGame();
        },

        // Finish Game
        finishGame() {
            clearInterval(this.timer);
            clearInterval(this.endGameTimer);
            this.gameOver = true;
            this.cpm = ((this.characterTyped / this.totalTime) * 60).toFixed(2);
        },

        // Return
        returnNewGame() {
            this.$emit('showLevelPage');
        }
    },
    mounted() {
        if ( this.isGameStarted) {
            this.startGame();
        }
    }
}
</script>

<style scoped>
/* Timer */
.timer {
    margin: 30px auto;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: rgb(189, 183, 183,0.5);
    align-content: center;
    font-weight: bold;
    font-size: 35px;
}

.button button {
    font-size: 24px; 
    margin: 10px 20px; 
    text-align: center; 
    width: 120px; 
    height: 50px; 
    cursor:pointer;
    transition: background-color 0.3s;
    border-radius: 40%;
    background-color: aliceblue;
    border:none ;
    box-shadow: #000000 ;
    box-shadow: 0 2px 4px #000000;
    /* Font */
    font-size: 20px;
    font-weight: bold;
    color: rgb(96, 96, 96);
}

.button button:hover {
  background-color: bisque;
}

/* Results */
.finishGame {
    margin: 50px auto;
    width: 800px;
    height: 400px;
    color: aliceblue;
    background-color: rgb(189, 183, 183,0.5);
    font-weight: bold;
    text-shadow: 2px 2px 4px #000000;
    letter-spacing: 4px;
    z-index: 1;
}

.result {
    padding: 50px;
    font-size: 20px;
}

.finishGame button {
    font-size: 24px; 
    margin: 30px auto; 
    text-align: center; 
    width: 100px; 
    height: 45px; 
    cursor:pointer;
    transition: background-color 0.3s;
    border-radius: 20%;
    background-color: aliceblue;
    border:none ;
    box-shadow: 0 2px 4px #000000;
    /* Font */
    font-size: 20px;
    font-weight: bold;
    color: rgb(96, 96, 96);
}

.finishGame button:hover {
  background-color: bisque;
}
</style>