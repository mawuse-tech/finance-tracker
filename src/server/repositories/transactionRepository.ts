import { randomUUID } from 'node:crypto'
import { TransactionModel, type TransactionDocument } from '../models/transaction'
import type { Transaction, TransactionFormData } from '../../utils/transaction'

const createTransactionId = () => `txn-${randomUUID()}`

const toTransaction = (transaction: TransactionDocument): Transaction => ({
  id: transaction.id,
  title: transaction.title,
  amount: transaction.amount,
  category: transaction.category,
  type: transaction.type,
  date: transaction.date,
  notes: transaction.notes,
})

export const transactionRepository = {
  async listTransactions() {
    const transactions = await TransactionModel.find().sort({ date: -1, createdAt: -1 }).exec()

    return transactions.map(toTransaction)
  },

  async findTransaction(transactionId: string) {
    const transaction = await TransactionModel.findOne({ id: transactionId }).exec()

    return transaction ? toTransaction(transaction) : null
  },

  async createTransaction(transaction: TransactionFormData) {
    const createdTransaction = await TransactionModel.create({
      id: createTransactionId(),
      ...transaction,
    })

    return toTransaction(createdTransaction)
  },

  async updateTransaction(transactionId: string, transaction: TransactionFormData) {
    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { id: transactionId },
      transaction,
      { new: true, runValidators: true },
    ).exec()

    return updatedTransaction ? toTransaction(updatedTransaction) : null
  },

  async deleteTransaction(transactionId: string) {
    const deletedTransaction = await TransactionModel.findOneAndDelete({ id: transactionId }).exec()

    return Boolean(deletedTransaction)
  },
}
