import { computed, ref, type Ref } from 'vue'
import type { Transaction, TransactionType } from '../utils/transaction'

export type TransactionTypeFilter = 'all' | TransactionType

export const useTransactionFilters = (transactions: Ref<Transaction[]>) => {
  const selectedType = ref<TransactionTypeFilter>('all')
  const selectedCategory = ref('')
  const selectedDate = ref('')

  const categories = computed(() =>
    Array.from(new Set(transactions.value.map((transaction) => transaction.category))).sort(),
  )

  const filteredTransactions = computed(() =>
    transactions.value.filter((transaction) => {
      const matchesType = selectedType.value === 'all' || transaction.type === selectedType.value
      const matchesCategory =
        selectedCategory.value === '' || transaction.category === selectedCategory.value
      const matchesDate = selectedDate.value === '' || transaction.date === selectedDate.value

      return matchesType && matchesCategory && matchesDate
    }),
  )

  const resetFilters = () => {
    selectedType.value = 'all'
    selectedCategory.value = ''
    selectedDate.value = ''
  }

  return {
    selectedType,
    selectedCategory,
    selectedDate,
    categories,
    filteredTransactions,
    resetFilters,
  }
}
