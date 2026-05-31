<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import FinanceChartsSection from '../components/charts/FinanceChartsSection.vue'
import StatusBanner from '../components/common/StatusBanner.vue'
import BudgetProgress from '../components/dashboard/BudgetProgress.vue'
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'
import SummaryCards from '../components/dashboard/SummaryCards.vue'
import TransactionForm from '../components/transactions/TransactionForm.vue'
import TransactionSection from '../components/transactions/TransactionSection.vue'
import { useDashboardSummary } from '../composables/useDashboardSummary'
import { budgetProgressItems } from '../services/finance'
import { useFinanceStore } from '../stores/finance'
import type { TransactionFormData } from '../utils/transaction'
import { createEmptyTransactionForm } from '../utils/transactionHelpers'

const financeStore = useFinanceStore()
const { currentBalance, errorMessage, isLoading, isSaving, totalExpenses, totalIncome, transactions } =
  storeToRefs(financeStore)

const summaryCards = useDashboardSummary({
  currentBalance,
  totalExpenses,
  totalIncome,
})

const transactionForm = ref<TransactionFormData>(createEmptyTransactionForm())

onMounted(() => {
  void financeStore.fetchTransactions()
})

const handleTransactionSubmit = async (formData: TransactionFormData) => {
  const wasSaved = await financeStore.addTransaction(formData)

  if (wasSaved) {
    transactionForm.value = createEmptyTransactionForm()
  }
}

const handleTransactionDelete = async (transactionId: string) => {
  await financeStore.deleteTransaction(transactionId)
}
</script>

<template>
  <section class="space-y-6">
    <DashboardHeader />

    <StatusBanner :error-message="errorMessage" :is-loading="isLoading" />

    <SummaryCards :cards="summaryCards" />

    <TransactionForm
      id="transaction-form"
      v-model="transactionForm"
      :is-submitting="isSaving"
      submit-label="Add transaction"
      @submit="handleTransactionSubmit"
    />

    <FinanceChartsSection
      :transactions="transactions"
      :total-expenses="totalExpenses"
      :total-income="totalIncome"
    />

    <!-- <BudgetProgress :budgets="budgetProgressItems" /> -->

    <TransactionSection :transactions="transactions" @delete="handleTransactionDelete" />
  </section>
</template>
