import { computed, type Ref } from 'vue'
import type { Transaction } from '../utils/transaction'
import type { FinanceChartDataset } from '../utils/chart'

const chartColors = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e', '#8b5cf6', '#14b8a6']

export const useFinanceChartData = (
  transactions: Ref<Transaction[]>,
  totalIncome: Ref<number>,
  totalExpenses: Ref<number>,
) => {
  const expenseTotalsByCategory = computed(() =>
    transactions.value
      .filter((transaction) => transaction.type === 'expense')
      .reduce<Record<string, number>>((totals, transaction) => {
        totals[transaction.category] = (totals[transaction.category] ?? 0) + transaction.amount

        return totals
      }, {}),
  )

  const expenseCategoryLabels = computed(() => Object.keys(expenseTotalsByCategory.value))

  const expenseCategoryDatasets = computed<FinanceChartDataset[]>(() => [
    {
      label: 'Expenses',
      data: expenseCategoryLabels.value.map(
        (category) => expenseTotalsByCategory.value[category] ?? 0,
      ),
      backgroundColor: expenseCategoryLabels.value.map(
        (_, index) => chartColors[index % chartColors.length] ?? '#64748b',
      ),
      borderWidth: 0,
      hoverOffset: 8,
    },
  ])

  const incomeExpenseLabels = ['Income', 'Expenses']

  const incomeExpenseDatasets = computed<FinanceChartDataset[]>(() => [
    {
      label: 'Amount',
      data: [totalIncome.value, totalExpenses.value],
      backgroundColor: ['#10b981', '#f43f5e'],
      borderColor: ['#059669', '#e11d48'],
      borderRadius: 8,
      borderWidth: 1,
      maxBarThickness: 96,
    },
  ])

  return {
    expenseCategoryDatasets,
    expenseCategoryLabels,
    incomeExpenseDatasets,
    incomeExpenseLabels,
  }
}
