import { transactionService } from '../../services/transactionService'
import { readTransactionPayload } from '../../utils/transactionPayload'

export default defineEventHandler(async (event) => {
  const transaction = await readTransactionPayload(event)

  return await transactionService.createTransaction(transaction)
})
