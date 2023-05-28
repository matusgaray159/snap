<template>
  <div class="stats">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.stats {
  @include flex(center, center, column);

  width: 80%;
  max-width: rem(360);
  padding: rem(8) rem(12);
  border-radius: rem(4);

  font-size: rem(14);

  background-color: $c-purple-600;

  @include at-least($xs) {
    font-size: rem(16);
  }

  @include at-least($sm) {
    @include flex(space-around, center, row);
  }
}
</style>
