<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardCardTone } from '../../utils/dashboard'

const props = defineProps<{
  title: string
  value: string
  change: string
  caption: string
  tone: DashboardCardTone
}>()

const toneClasses: Record<DashboardCardTone, { icon: string; chip: string; bar: string }> = {
  emerald: {
    icon: 'bg-emerald-100 text-emerald-700',
    chip: 'bg-emerald-50 text-emerald-700',
    bar: 'bg-emerald-500',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-700',
    chip: 'bg-blue-50 text-blue-700',
    bar: 'bg-blue-500',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-700',
    chip: 'bg-amber-50 text-amber-700',
    bar: 'bg-amber-500',
  },
  rose: {
    icon: 'bg-rose-100 text-rose-700',
    chip: 'bg-rose-50 text-rose-700',
    bar: 'bg-rose-500',
  },
}

const classes = computed(() => toneClasses[props.tone])
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ title }}</p>
        <p class="mt-2 text-2xl font-semibold tracking-normal text-slate-950">{{ value }}</p>
      </div>

      <div :class="['rounded-lg p-2', classes.icon]">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 19V5m5 14V9m5 10V3m5 16v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
    </div>

    <div class="mt-5 flex items-center justify-between gap-3">
      <span :class="['rounded-full px-2.5 py-1 text-xs font-semibold', classes.chip]">{{ change }}</span>
      <span class="text-xs text-slate-500">{{ caption }}</span>
    </div>

    <div class="mt-4 h-1.5 rounded-full bg-slate-100">
      <div :class="['h-1.5 w-2/3 rounded-full', classes.bar]"></div>
    </div>
  </article>
</template>
