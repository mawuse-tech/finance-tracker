import { transactionService } from '../../services/transactionService'

export default defineEventHandler(async () => {
  return await transactionService.listTransactions()
})
