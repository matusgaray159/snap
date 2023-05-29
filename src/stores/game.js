import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://deckofcardsapi.com/api/deck/'

export const useGameStore = defineStore('gameStore', () => {
  const deckId = ref(null)
  const previousCard = ref(null)
  const currentCard = ref(null)
  const snapMessage = ref('')
  const valueMatches = ref(0)
  const suitMatches = ref(0)
  const remaining = ref(0)
  const gameOver = ref(false)
  const isCardAnimating = ref(false)
  const error = ref(null)

  const cardsRemainingMessage = computed(() => {
    const cardWord = remaining.value === 1 ? 'card' : 'cards'
    return `<strong>${remaining.value}</strong> ${cardWord} remaining`
  })

  const valueMatchesMessage = computed(
    () => `Value Matches: <strong>${valueMatches.value}</strong>`
  )

  const suitMatchesMessage = computed(() => `Suit Matches: <strong>${suitMatches.value}</strong>`)

  const executeApiRequest = async (request) => {
    try {
      return await request
    } catch (err) {
      error.value = err.message
      alert(`An error occurred: ${err.message}`)
    }
  }

  const initGame = async () => {
    const request = axios.get(`${API_URL}new/shuffle/?deck_count=1`)
    const { data } = await executeApiRequest(request)

    if (data) {
      deckId.value = data.deck_id
      remaining.value = data.remaining
    }
  }

  const checkMatch = () => {
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

  const checkGameOver = () => {
    if (!remaining.value) {
      gameOver.value = true
    }
  }

  const updateCards = (newCurrentCard, cardsRemaining) => {
    previousCard.value = currentCard.value
    currentCard.value = newCurrentCard
    remaining.value = cardsRemaining
  }

  const drawCard = async () => {
    if (!deckId.value) {
      initGame()
    }

    if (!isCardAnimating.value) {
      const request = axios.get(`${API_URL}${deckId.value}/draw/?count=1`)
      const { data } = await executeApiRequest(request)

      if (data) {
        updateCards(data.cards[0], data.remaining)
        checkMatch()
        checkGameOver()
      }
    }
  }

  return {
    previousCard,
    currentCard,
    snapMessage,
    gameOver,
    cardsRemainingMessage,
    valueMatchesMessage,
    suitMatchesMessage,
    initGame,
    drawCard,
    isCardAnimating
  }
})
