import { apiRequest } from '../api'
import type { Transaction, TransactionFormData } from '../../utils/transaction'

export const transactionApiService = {
  getTransactions() {
    return apiRequest<Transaction[]>('/transactions')
  },

  createTransaction(transaction: TransactionFormData) {
    return apiRequest<Transaction>('/transactions', {
      method: 'POST',
      body: transaction,
    })
  },

  updateTransaction(transactionId: string, transaction: TransactionFormData) {
    return apiRequest<Transaction>(`/transactions/${transactionId}`, {
      method: 'PUT',
      body: transaction,
    })
  },

  deleteTransaction(transactionId: string) {
    return apiRequest<void>(`/transactions/${transactionId}`, {
      method: 'DELETE',
    })
  },
}
