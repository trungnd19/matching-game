<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "../stores/GameStore";

const gameStore = useGameStore();
const { newPlayer } = storeToRefs(gameStore);
import halloweenDeck from "../data/halloweenDeck.json";
import peppaDeck from "../data/peppaDeck.json";
import { ref } from "vue";

const deckSelected = ref(false)
const showDeckSelectionSection = ref(true)

const startNewGame = () => {
  if (newPlayer.value) {
    gameStore.startGame();
  } else {
    gameStore.restartGame();
  }
  showDeckSelectionSection.value = false
  deckSelected.value = false
};

const restartNewGame = () => {
  showDeckSelectionSection.value = true
  deckSelected.value = false
  gameStore.resetCardList()
}

function selectDeck(deck: string[]) {
  gameStore.changeCurrentDeck(deck)
  deckSelected.value = true
}
</script>

<template>
  <div v-if="showDeckSelectionSection">
    <p :class="$style['select-deck-text']">Please Select Deck</p>
    <div :class="$style['deck-selection']">
      <button @click="selectDeck(peppaDeck)" :class="$style['deck-selection-button']">Peppa</button>
      <button @click="selectDeck(halloweenDeck)" :class="$style['deck-selection-button']">Halloween</button>
    </div>
  </div>
  <button v-if="deckSelected" @click="startNewGame" :class="$style.button">
    <div :class="$style['button-icon']">
      <img
        :class="$style['icon-play']"
        src="/images/play.svg"
        alt="Play Icon"
      /><img
        :class="$style['icon-ghost']"
        src="/images/cute-ghost.svg"
        alt="Cute Ghost"
      />
    </div>
    Start Game
  </button>
  <button v-if="!showDeckSelectionSection" @click="restartNewGame" :class="$style.button">
    <img src="/images/restart.svg" alt="Restart Icon" />Restart Game
  </button>
</template>

<style module>
.button {
  background-color: #e78805;
  color: white;
  padding: 8px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-weight: bold;
  font-family: "Titillium Web", sans-serif;
  font-weight: bold;
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #e78805;
}

.button:hover {
  border: 2px solid #e78805;
  background-color: transparent;
}

.button:hover .icon-ghost {
  opacity: 1;
}

.button:hover .icon-play {
  opacity: 0;
}

.button img {
  padding-right: 12px;
  transition: 0.2s opacity ease-in;
}

.button .icon-ghost {
  position: absolute;
  left: -6px;
  opacity: 0;
}

.button .icon-play {
  position: absolute;
  left: -6px;
  opacity: 1;
}

.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
}

.deck-selection {
  display: flex;
  /* flex-direction: row; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.deck-selection-button {
  background-color: #54972e;
  color: white;
  padding: 8px 16px 10px;
  font-weight: bold;
  font-family: "Titillium Web", sans-serif;
  font-weight: bold;
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #54972e;
}

.deck-selection-button:hover {
  border: 2px solid #54972e;
  background-color: transparent;
}

.select-deck-text {
  font-weight: bold;
  font-family: "Titillium Web", sans-serif;
  font-weight: bold;
}
</style>
