<script setup lang="ts">
import type { TransactionTypeFilter } from '../../composables/useTransactionFilters'

defineProps<{
  categories: string[]
  selectedCategory: string
  selectedDate: string
  selectedType: TransactionTypeFilter
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:selectedDate': [value: string]
  'update:selectedType': [value: TransactionTypeFilter]
  reset: []
}>()

const transactionTypeFilters: { label: string; value: TransactionTypeFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
]
</script>

<template>
  <div>
    <div class="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-base font-semibold text-slate-950">Recent transactions</h3>
        <p class="mt-1 text-sm text-slate-500">Filter by type, category, or date.</p>
      </div>
      <button
        class="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        type="button"
        @click="emit('reset')"
      >
        Reset filters
      </button>
    </div>

    <div class="grid gap-4 border-b border-slate-200 p-5 lg:grid-cols-[1fr_12rem_12rem]">
      <div>
        <span class="text-sm font-medium text-slate-700">Type</span>
        <div class="mt-2 grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
          <label
            v-for="filter in transactionTypeFilters"
            :key="filter.value"
            :class="[
              'cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition',
              selectedType === filter.value
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-950',
            ]"
          >
            <input
              class="sr-only"
              type="radio"
              :value="filter.value"
              :checked="selectedType === filter.value"
              @change="emit('update:selectedType', filter.value)"
            />
            {{ filter.label }}
          </label>
        </div>
      </div>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Category</span>
        <select
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          :value="selectedCategory"
          @change="emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">All categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Date</span>
        <input
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          type="date"
          :value="selectedDate"
          @input="emit('update:selectedDate', ($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>
  </div>
</template>
