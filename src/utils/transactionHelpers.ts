import type { TransactionFormData } from './transaction'
import { getTodayDate } from './date'

export const createEmptyTransactionForm = (): TransactionFormData => ({
  title: '',
  amount: 0,
  category: '',
  type: 'expense',
  date: getTodayDate(),
  notes: '',
})
