import _ from 'lodash'
import { computed, ref, type Ref } from 'vue'
import type { Card } from './createDeck'

export default function createGame(deck: Ref<Card[]>) {
  const newPlayer = ref(true)

  const startGame = () => {
    newPlayer.value = false

    restartGame()
  }

  const restartGame = () => {
    deck.value = _.shuffle(deck.value)

    deck.value = deck.value.map((card, index) => {
      return {
        ...card,
        matched: false,
        position: index,
        visible: false
      }
    })
  }

  const status = computed(() => {
    if (matchesFound.value === 8) {
      return 'Player wins!'
    } else {
      return `Matches found: ${matchesFound.value}`
    }
  })

  const matchesFound = computed(() => {
    const matchedCards = deck.value.filter(card => card.matched === true).length

    return matchedCards / 2
  })

  return {
    matchesFound,
    newPlayer,
    restartGame,
    startGame,
    status
  }
}
