<script setup lang="ts">
import { computed } from 'vue'
import TransactionFilters from './TransactionFilters.vue'
import TransactionList from './TransactionList.vue'
import { useTransactionFilters } from '../../composables/useTransactionFilters'
import type { Transaction } from '../../utils/transaction'

const props = defineProps<{
  transactions: Transaction[]
}>()

const emit = defineEmits<{
  delete: [transactionId: string]
}>()

const transactionsRef = computed(() => props.transactions)
const {
  categories,
  filteredTransactions,
  resetFilters,
  selectedCategory,
  selectedDate,
  selectedType,
} = useTransactionFilters(transactionsRef)
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
    <TransactionFilters
      v-model:selected-category="selectedCategory"
      v-model:selected-date="selectedDate"
      v-model:selected-type="selectedType"
      :categories="categories"
      @reset="resetFilters"
    />

    <TransactionList :transactions="filteredTransactions" @delete="emit('delete', $event)" />
  </article>
</template>
