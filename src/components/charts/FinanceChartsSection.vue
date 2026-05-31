<script setup lang="ts">
import { toRefs } from 'vue'
import FinanceChart from './FinanceChart.vue'
import { useFinanceChartData } from '../../composables/useFinanceChartData'
import type { Transaction } from '../../utils/transaction'

const props = defineProps<{
  totalExpenses: number
  totalIncome: number
  transactions: Transaction[]
}>()

const { totalExpenses, totalIncome, transactions } = toRefs(props)
const {
  expenseCategoryDatasets,
  expenseCategoryLabels,
  incomeExpenseDatasets,
  incomeExpenseLabels,
} = useFinanceChartData(transactions, totalIncome, totalExpenses)
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <FinanceChart
      title="Expenses by category"
      description="Expense distribution grouped by transaction category."
      type="doughnut"
      :labels="expenseCategoryLabels"
      :datasets="expenseCategoryDatasets"
    />

    <FinanceChart
      title="Income vs expenses"
      description="Total income compared with total expenses."
      type="bar"
      :labels="incomeExpenseLabels"
      :datasets="incomeExpenseDatasets"
    />
  </div>
</template>
