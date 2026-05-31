<script setup lang="ts">
import type { BudgetProgressItem } from '../../utils/budget'

defineProps<{
  budgets: BudgetProgressItem[]
}>()
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div>
      <h3 class="text-base font-semibold text-slate-950">Budget progress</h3>
      <p class="mt-1 text-sm text-slate-500">Current month categories.</p>
    </div>

    <div class="mt-6 space-y-5">
      <div v-for="budget in budgets" :key="budget.name">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-medium text-slate-700">{{ budget.name }}</p>
          <p class="text-xs text-slate-500">{{ budget.spent }} / {{ budget.limit }}</p>
        </div>
        <div class="mt-2 h-2 rounded-full bg-slate-100">
          <div :class="['h-2 rounded-full', budget.progress, budget.color]"></div>
        </div>
      </div>
    </div>
  </article>
</template>
