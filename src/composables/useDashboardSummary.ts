import { computed, type Ref } from 'vue'
import { formatCurrency } from '../utils/currency'
import type { DashboardSummaryCard } from '../utils/dashboard'

type FinanceSummaryRefs = {
  currentBalance: Ref<number>
  totalExpenses: Ref<number>
  totalIncome: Ref<number>
}

export const useDashboardSummary = ({
  currentBalance,
  totalExpenses,
  totalIncome,
}: FinanceSummaryRefs) =>
  computed<DashboardSummaryCard[]>(() => [
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome.value),
      change: 'Income',
      caption: 'All recorded income',
      tone: 'emerald',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses.value),
      change: 'Expense',
      caption: 'All recorded expenses',
      tone: 'rose',
    },
    {
      title: 'Current Balance',
      value: formatCurrency(currentBalance.value),
      change: 'Balance',
      caption: 'Income minus expenses',
      tone: currentBalance.value >= 0 ? 'blue' : 'rose',
    },
  ])
