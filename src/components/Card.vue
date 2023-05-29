<template>
  <div ref="cardElement" class="card">
    <img class="card__front" :src="card.image" :alt="card.code" />
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin.js'
import { Howl } from 'howler'
import cardMoveSound from '@/assets/cardmove.mp3'
import { ref, watchEffect, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

gsap.registerPlugin(MotionPathPlugin)

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  isCurrentCard: {
    type: Boolean,
    default: false
  }
})

const gameStore = useGameStore()

const { isCardAnimating } = storeToRefs(gameStore)

const isCurrentCard = ref(props.isCurrentCard)
const cardElement = ref(null)

const sound = new Howl({
  src: [cardMoveSound]
})

watchEffect(async () => {
  if (cardElement.value && isCurrentCard.value && props.card) {
    await nextTick()

    isCardAnimating.value = true

    sound.play()

    const tl = gsap.timeline()

    tl.fromTo(
      cardElement.value,
      { x: window.innerWidth / 2, y: -100, rotationY: 180 },
      {
        duration: 0.75,
        ease: 'power1.inOut',
        motionPath: {
          path: [
            { x: window.innerWidth / 2, y: 20 },
            { x: 0, y: 0 }
          ],
          curviness: 1.25,
          autoRotate: false
        }
      }
    )

    tl.to(
      cardElement.value,
      {
        duration: 0.75,
        rotationY: 0,
        ease: 'power1.inOut'
      },
      `-=0.5`
    )

    tl.eventCallback('onComplete', () => {
      gsap.set(cardElement.value, { clearProps: 'all' })
      isCardAnimating.value = false
    })

    // Clear the styles
  }
})
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  left: 0;
  top: 0;

  &__front {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
