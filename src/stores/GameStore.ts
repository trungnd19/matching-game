import { defineStore } from "pinia";
import createDeck from "../features/createDeck";
import createGame from "../features/createGame";
// import halloweenDeck from "../data/halloweenDeck.json";
import { DECK } from "../data/decks"
import { ref, watch } from "vue";

export const useGameStore = defineStore("GameStore", () => {
  const currentDeck = ref()
  const { cardList } = createDeck(DECK.HALLOWEEN);
  let { newPlayer, startGame, restartGame, matchesFound, status } =
    createGame(cardList);

  watch(currentDeck, (newValue) => {
    resetCardList()
    cardList.value = (createDeck(newValue)).cardList.value
    newPlayer.value = createGame(cardList).newPlayer.value
    startGame = createGame(cardList).startGame
    restartGame = createGame(cardList).restartGame

  })

  function changeCurrentDeck(deck: string[]) {
    currentDeck.value = deck
  }

  function resetCardList() {
    cardList.value = []
  }

  return {
    currentDeck,
    cardList,
    newPlayer,
    startGame,
    resetCardList,
    restartGame,
    changeCurrentDeck,
    matchesFound: createGame(cardList).matchesFound.value,
    status: createGame(cardList).status.value,
  };
});
