import { ref } from 'vue'

export interface ICard {
  value: string,
  variant: number,
  visible: boolean,
  position: null | number,
  matched: boolean
}

const cardList = ref<ICard[]>([])

const initDeck = (deckData: string[]) => {
  deckData.forEach(item => {
    cardList.value.push({
      value: item,
      variant: 1,
      visible: false,
      position: null,
      matched: false
    })

    cardList.value.push({
      value: item,
      variant: 2,
      visible: true,
      position: null,
      matched: false
    })
  })
}

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index
    }
  })
}

export default function createDeck(deckData: string[]) {
  setTimeout(() => {
    initDeck(deckData)
  }, 200)
  updateCardPosition()

  return {
    cardList
  }
}
