import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Transaction, TransactionFormData } from '../utils/transaction'
import { transactionApiService } from '../services/finance'

export const useFinanceStore = defineStore('finance', () => {
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const errorMessage = ref('')

  const fetchTransactions = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      transactions.value = await transactionApiService.getTransactions()
    } catch {
      errorMessage.value = 'Unable to load transactions from the database.'
    } finally {
      isLoading.value = false
    }
  }

  const addTransaction = async (transaction: TransactionFormData) => {
    isSaving.value = true
    errorMessage.value = ''

    try {
      const savedTransaction = await transactionApiService.createTransaction(transaction)
      transactions.value = [savedTransaction, ...transactions.value]
      errorMessage.value = ''
      return true
    } catch {
      errorMessage.value = 'Unable to save the transaction to the database.'
      return false
    } finally {
      isSaving.value = false
    }
  }

  const updateTransaction = async (transactionId: string, transaction: TransactionFormData) => {
    isSaving.value = true
    errorMessage.value = ''

    try {
      const updatedTransaction = await transactionApiService.updateTransaction(transactionId, transaction)

      transactions.value = transactions.value.map((currentTransaction) =>
        currentTransaction.id === transactionId ? updatedTransaction : currentTransaction,
      )

      return true
    } catch {
      errorMessage.value = 'Unable to update the transaction in the database.'
      return false
    } finally {
      isSaving.value = false
    }
  }

  const deleteTransaction = async (transactionId: string) => {
    const previousTransactions = transactions.value
    transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionId)
    errorMessage.value = ''

    try {
      await transactionApiService.deleteTransaction(transactionId)
      errorMessage.value = ''
      return true
    } catch {
      transactions.value = previousTransactions
      errorMessage.value = 'Unable to delete the transaction from the database.'
      return false
    }
  }

  const totalIncome = computed(() =>
    transactions.value
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0),
  )

  const totalExpenses = computed(() =>
    transactions.value
      .filter((transaction) => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0),
  )

  const currentBalance = computed(() => totalIncome.value - totalExpenses.value)

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
    isLoading,
    isSaving,
    errorMessage,
    totalIncome,
    totalExpenses,
    currentBalance,
  }
})
