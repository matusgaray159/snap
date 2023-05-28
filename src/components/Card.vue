<template>
  <div class="card">
    <img class="card__front" :src="card.image" :alt="card.code" />
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true
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
