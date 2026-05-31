import { createError } from 'h3'
import { transactionService } from '../../services/transactionService'
import { readTransactionPayload } from '../../utils/transactionPayload'
import { getTransactionIdParam } from '../../utils/transactionRouteParams'

export default defineEventHandler(async (event) => {
  const transactionId = getTransactionIdParam(event)
  const transaction = await readTransactionPayload(event)
  const updatedTransaction = await transactionService.updateTransaction(transactionId, transaction)

  if (!updatedTransaction) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Transaction was not found.',
    })
  }

  return updatedTransaction
})
