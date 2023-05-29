<!-- SnapMessage.vue -->

<template>
  <p v-if="message" ref="snapMessageElement" class="snap-message">
    {{ message }}
  </p>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  message: String
})

const snapMessageElement = ref(null)

watchEffect(() => {
  if (props.message) {
    nextTick(() => {
      gsap.fromTo(
        snapMessageElement.value,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.15, ease: 'power1.out', delay: 0.75 }
      )
    })
  }
})
</script>

<style lang="scss">
.snap-message {
  font-size: rem(24);

  @include at-least($sm) {
    font-size: rem(32);
  }
}
</style>
