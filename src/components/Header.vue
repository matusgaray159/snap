<template>
  <div class="site-header">
    <h1 class="brand">SNAP!</h1>
    <nav class="controls">
      <button type="button" class="controls__item"></button>
      <button type="button" class="controls__item"></button>
      <button type="button" class="controls__item profile">
        <img class="profile__image" src="@/assets/images/profile.jpg" alt="" />
      </button>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.site-header {
  @include flex(space-between, center);

  height: rem($site-header-height-mobile);
  padding: rem(4) rem($site-offset-horizontal-mobile);

  background-color: $c-purple-600;

  @include at-least($sm) {
    height: rem($site-header-height);
    padding-inline: rem($site-offset-horizontal);
  }
}

.brand {
  font-size: rem(28);
  font-weight: 700;

  @include at-least($sm) {
    font-size: rem(34);
  }
}

.controls {
  @include flex(center, center);

  gap: rem(8);

  &__item {
    @include flex(center, center);

    @include circle(rem(32));

    background-color: $c-secondary;

    @include at-least($sm) {
      @include circle(rem(40));
    }
  }

  .profile {
    background-color: $c-purple-500;
    overflow: hidden;
    border: rem(2) solid $c-secondary;

    &__image {
      @include circle(rem(32));
      object-fit: cover;

      @include at-least($sm) {
        @include circle(rem(40));
      }
    }
  }
}
</style>
