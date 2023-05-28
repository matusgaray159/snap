<template>
  <button type="button" class="btn" :class="variant">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'btn--primary' }
})
</script>

<style scoped lang="scss">
.btn {
  @include flex(center, center);

  padding: rem(8) rem(16);
  border-radius: rem(4);
  border: none;
  outline: none;
  cursor: pointer;

  font-size: rem(16);
  font-weight: 700;

  &--primary {
    background: linear-gradient(0deg, $c-yellow-600 40%, $c-yellow-500 110%);
    color: $c-gray-600;

    @media (hover: hover) {
      &:hover {
        background: $c-yellow-600;
      }
    }
  }

  &--big {
    padding: rem(8) rem(24);

    font-size: rem(16);

    @include at-least($sm) {
      padding: rem(16) rem(42);

      font-size: rem(18);
    }
  }
}
</style>
