export type TransactionType = 'income' | 'expense'

export const TRANSACTION_CATEGORIES = [
  'Income',
  'Food',
  'Utilities',
  'Transport',
  'Housing',
  'Entertainment',
  'Savings',
  'Other',
]

export type Transaction = {
  id: string
  title: string
  amount: number
  category: string
  type: TransactionType
  date: string
  notes: string
}

export type TransactionFormData = Omit<Transaction, 'id'>
