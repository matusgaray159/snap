<template>
  <Header />

  <main>
    <div class="game">
      <div class="game__header">
        <p v-if="snapMessage" class="snap-message">{{ snapMessage }}</p>
      </div>

      <div class="cards">
        <div class="cards__slot">
          <Card v-if="previousCard" :card="previousCard" />
        </div>
        <div class="cards__slot">
          <Card v-if="currentCard" :card="currentCard" />
        </div>
      </div>

      <div class="game__footer">
        <Stats v-if="gameOver">
          <p>
            Value Matches: <strong>{{ valueMatches }}</strong>
          </p>
          <p>
            Suit Matches: <strong>{{ suitMatches }}</strong>
          </p>
        </Stats>

        <template v-else>
          <div class="mb-20">
            <Button @click="drawCard" variant="btn--primary btn--big">Draw card</Button>
          </div>
          <Stats>
            <p>
              <strong>{{ remaining }}</strong> cards remaining
            </p>
          </Stats>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import Button from './components/Button.vue'
import Stats from './components/Stats.vue'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from './stores/game'

const gameStore = useGameStore()

const { initGame, drawCard } = gameStore

const { valueMatches, suitMatches, gameOver, remaining, previousCard, currentCard, snapMessage } =
  storeToRefs(gameStore)

onMounted(() => {
  initGame()
})
</script>

<style lang="scss">
@use '@/assets/styles/_globals' as *;

main {
  @include flex(center, center);

  min-height: calc(100vh - rem(70));
}

.game {
  @include flex(center, center, column);

  width: rem(600);
  max-width: 100%;
  padding: rem($site-offset-horizontal-mobile) rem($site-offset-horizontal-mobile) rem(40);

  @include at-least($sm) {
    padding-inline: rem($site-offset-horizontal);
  }

  &__header {
    min-height: rem(40);
    margin-bottom: rem(16);

    @include at-least($sm) {
      min-height: rem(60);
      margin-bottom: rem(20);
    }
  }

  &__footer {
    @include flex(center, center, column);

    width: 100%;
    min-height: rem(100);

    @include at-least($sm) {
      min-height: rem(130);
    }
  }
}

.snap-message {
  font-size: rem(24);

  @include at-least($sm) {
    font-size: rem(32);
  }
}

.cards {
  @include flex(space-between, center, row);
  gap: rem(16);

  width: 100%;
  margin-bottom: rem(20);

  @include at-least($sm) {
    margin-bottom: rem(40);
  }

  &__slot {
    flex: 1;

    position: relative;

    max-width: rem(226);
    aspect-ratio: 2/2.77;

    border: rem(2) solid $c-secondary;
    border-radius: rem(12);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      opacity: 0.2;

      background: $c-purple-600 url('@/assets/images/card_bg.png') no-repeat center;
      background-size: cover;
    }
  }
}
</style>
