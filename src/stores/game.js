import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = 'https://deckofcardsapi.com/api/deck/'

export const useGameStore = defineStore('gameStore', () => {
  const deckId = ref(null)
  const previousCard = ref(null)
  const currentCard = ref(null)
  const snapMessage = ref('')
  const valueMatches = ref(0)
  const suitMatches = ref(0)
  const remaining = ref(0)
  const gameOver = ref(false)

  const error = ref(null)

  const initGame = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}new/shuffle/?deck_count=1`)
      deckId.value = data.deck_id
      remaining.value = data.remaining
    } catch (err) {
      error.value = err.message
    }
  }

  const checkSnap = () => {
    if (previousCard.value && currentCard.value) {
      if (previousCard.value.value === currentCard.value.value) {
        snapMessage.value = 'Value Match!'
        valueMatches.value++
      } else if (previousCard.value.suit === currentCard.value.suit) {
        snapMessage.value = 'Suit Match!'
        suitMatches.value++
      } else {
        snapMessage.value = ''
      }
    }
  }

  const drawCard = async () => {
    if (!deckId.value) {
      initGame()
    }

    try {
      const { data } = await axios.get(`${apiUrl}${deckId.value}/draw/?count=1`)
      previousCard.value = currentCard.value
      currentCard.value = data.cards[0]
      remaining.value = data.remaining

      if (!data.remaining) {
        gameOver.value = true
      }

      checkSnap()
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    previousCard,
    currentCard,
    snapMessage,
    valueMatches,
    suitMatches,
    remaining,
    gameOver,
    initGame,
    drawCard
  }
})
