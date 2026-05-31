import { connectToDatabase } from '../utils/database'
import { transactionRepository } from '../repositories/transactionRepository'
import type { TransactionFormData } from '../../utils/transaction'

export const transactionService = {
  async listTransactions() {
    await connectToDatabase()

    return await transactionRepository.listTransactions()
  },

  async findTransaction(transactionId: string) {
    await connectToDatabase()

    return await transactionRepository.findTransaction(transactionId)
  },

  async createTransaction(transaction: TransactionFormData) {
    await connectToDatabase()

    return await transactionRepository.createTransaction(transaction)
  },

  async updateTransaction(transactionId: string, transaction: TransactionFormData) {
    await connectToDatabase()

    return await transactionRepository.updateTransaction(transactionId, transaction)
  },

  async deleteTransaction(transactionId: string) {
    await connectToDatabase()

    return await transactionRepository.deleteTransaction(transactionId)
  },
}
