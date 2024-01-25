import { defineStore } from "pinia";
import createDeck from "../features/createDeck";
import createGame from "../features/createGame";
import { DECK } from "../data/decks"
import { ref, watch } from "vue";

export const useGameStore = defineStore("GameStore", () => {
  const currentDeck = ref()
  const showLoading = ref(false)
  const { cardList } = createDeck(DECK.HALLOWEEN);
  let { newPlayer, startGame, restartGame, matchesFound, status } =
    createGame(cardList);

  watch(currentDeck, (newValue) => {
    toggleLoadingOn()
    resetCardList()
    reInitCardList(newValue)
    setTimeout(() => {
      toggleLoadingOff()
    }, 500)
  }, {
    deep: true,
    immediate: true
  })

  function changeCurrentDeck(deck: string[]) {
    currentDeck.value = deck
  }

  function resetCardList() {
    cardList.value = []
  }

  function toggleLoadingOn() {
    showLoading.value = true
  }

  function toggleLoadingOff() {
    showLoading.value = false
  }

  function reInitCardList(newList: any) {
    resetCardList()
    cardList.value = (createDeck(newList)).cardList.value
    newPlayer.value = createGame(cardList).newPlayer.value
    startGame = createGame(cardList).startGame
    restartGame = createGame(cardList).restartGame
  }

  return {
    currentDeck,
    cardList,
    newPlayer,
    startGame,
    resetCardList,
    restartGame,
    changeCurrentDeck,
    toggleLoadingOn,
    toggleLoadingOff,
    showLoading,
    matchesFound: createGame(cardList).matchesFound.value,
    status: createGame(cardList).status.value,
  };
});
