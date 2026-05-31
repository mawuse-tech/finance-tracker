<script setup lang="ts">
import DashboardCard from './DashboardCard.vue'
import type { DashboardSummaryCard } from '../../utils/dashboard'

defineProps<{
  cards: DashboardSummaryCard[]
}>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <DashboardCard
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :value="card.value"
      :change="card.change"
      :caption="card.caption"
      :tone="card.tone"
    />
  </div>
</template>
