import { createError } from 'h3'
import { transactionService } from '../../services/transactionService'
import { getTransactionIdParam } from '../../utils/transactionRouteParams'

export default defineEventHandler(async (event) => {
  const transactionId = getTransactionIdParam(event)
  const transaction = await transactionService.findTransaction(transactionId)

  if (!transaction) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Transaction was not found.',
    })
  }

  return transaction
})
