<script setup lang="ts">
// @ts-ignore
import Card from "./Card.vue";
import type { ICard } from "@/features/createDeck";

export interface Props {
  status: string
  cardList: ICard[]
}

withDefaults(defineProps<Props>(), {
  status: '',
  cardList: () => []
})

const emits = defineEmits(["flip-card"]);

const selectCard = (payload: ICard) => {
  emits("flip-card", payload);
};
</script>

<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="selectCard"
    />
  </transition-group>
  <h2 class="status">{{ status }}</h2>
</template>

<style></style>
