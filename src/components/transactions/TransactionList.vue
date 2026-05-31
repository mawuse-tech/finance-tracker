<script setup lang="ts">
import type { Transaction } from '../../utils/transaction'
import { formatCurrency } from '../../utils/currency'
import { formatDisplayDate } from '../../utils/date'

defineProps<{
  transactions: Transaction[]
}>()

const emit = defineEmits<{
  delete: [transactionId: string]
}>()

const formatTransactionAmount = (transaction: Transaction) => {
  const amount = formatCurrency(transaction.amount)

  return transaction.type === 'income' ? `+${amount}` : `-${amount}`
}
</script>

<template>
  <div class="divide-y divide-slate-100">
    <div v-if="transactions.length === 0" class="p-5 text-sm text-slate-500">
      No transactions yet.
    </div>

    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_8rem_7rem_2.5rem] sm:items-center"
    >
      <div class="min-w-0">
        <p class="truncate text-sm font-medium text-slate-950">{{ transaction.title }}</p>
        <p class="mt-1 text-xs text-slate-500">{{ transaction.category }}</p>
      </div>

      <p
        :class="[
          'text-sm font-semibold sm:text-right',
          transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600',
        ]"
      >
        {{ formatTransactionAmount(transaction) }}
      </p>

      <p class="text-sm text-slate-500 sm:text-right">{{ formatDisplayDate(transaction.date) }}</p>

      <button
        class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
        type="button"
        :aria-label="`Delete ${transaction.title}`"
        @click="emit('delete', transaction.id)"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
