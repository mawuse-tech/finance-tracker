<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
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
      class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 p-5 sm:grid-cols-[minmax(0,1fr)_8rem_7rem_2.5rem] sm:items-center"
    >
      <div class="min-w-0">
        <p class="truncate text-sm font-medium text-slate-950">{{ transaction.title }}</p>
        <p class="mt-1 text-xs text-slate-500">{{ transaction.category }}</p>
      </div>

      <div class="flex items-center justify-end gap-2 sm:contents">
        <p
          :class="[
            'whitespace-nowrap text-sm font-semibold sm:text-right',
            transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600',
          ]"
        >
          {{ formatTransactionAmount(transaction) }}
        </p>

        <button
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 sm:order-3 sm:justify-self-end"
          type="button"
          :aria-label="`Delete ${transaction.title}`"
          @click="emit('delete', transaction.id)"
        >
          <TrashIcon class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <p class="col-span-2 text-sm text-slate-500 sm:order-2 sm:col-span-1 sm:text-right">
        {{ formatDisplayDate(transaction.date) }}
      </p>
    </div>
  </div>
</template>
