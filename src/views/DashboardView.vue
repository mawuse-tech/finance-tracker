<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
import { formatCurrency } from '../utils/currency'
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
const monthlySavingsGoal = 5000

const savedAmount = computed(() => Math.max(currentBalance.value, 0))
const savingsProgress = computed(() => Math.min(Math.round((savedAmount.value / monthlySavingsGoal) * 100), 100))
const savingsProgressWidth = computed(() => `${savingsProgress.value}%`)
const savingsRemaining = computed(() => Math.max(monthlySavingsGoal - savedAmount.value, 0))

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
    <section id="dashboard" class="scroll-mt-24 space-y-6">
      <DashboardHeader />

      <StatusBanner :error-message="errorMessage" :is-loading="isLoading" />

      <SummaryCards :cards="summaryCards" />
    </section>

    <section id="transactions" class="scroll-mt-24 space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-950">Transactions</h2>
        <p class="mt-1 text-sm text-slate-500">Add new activity and review your transaction history.</p>
      </div>

      <TransactionForm
        id="transaction-form"
        v-model="transactionForm"
        :is-submitting="isSaving"
        submit-label="Add transaction"
        @submit="handleTransactionSubmit"
      />

      <TransactionSection :transactions="transactions" @delete="handleTransactionDelete" />
    </section>

    <section id="budgets" class="scroll-mt-24 space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-950">Budgets</h2>
        <p class="mt-1 text-sm text-slate-500">Track category spending against the current month limits.</p>
      </div>

      <BudgetProgress :budgets="budgetProgressItems" />
    </section>

    <section id="savings" class="scroll-mt-24 space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-950">Savings</h2>
        <p class="mt-1 text-sm text-slate-500">Measure available balance against your savings target.</p>
      </div>

      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">Current savings</p>
            <p class="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              {{ formatCurrency(savedAmount) }}
            </p>
          </div>

          <div class="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
            {{ savingsProgress }}% funded
          </div>
        </div>

        <div class="mt-6">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-slate-700">Monthly savings goal</p>
            <p class="text-xs text-slate-500">{{ formatCurrency(monthlySavingsGoal) }}</p>
          </div>

          <div class="mt-2 h-2 rounded-full bg-slate-100">
            <div class="h-2 rounded-full bg-blue-500" :style="{ width: savingsProgressWidth }"></div>
          </div>

          <p class="mt-3 text-sm text-slate-500">
            {{ formatCurrency(savingsRemaining) }} remaining to reach this goal.
          </p>
        </div>
      </article>
    </section>

    <section id="reports" class="scroll-mt-24 space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-950">Reports</h2>
        <p class="mt-1 text-sm text-slate-500">Review spending patterns and income versus expense trends.</p>
      </div>

      <FinanceChartsSection
        :transactions="transactions"
        :total-expenses="totalExpenses"
        :total-income="totalIncome"
      />
    </section>
  </section>
</template>
