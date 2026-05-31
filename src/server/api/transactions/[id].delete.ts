import { createError, setResponseStatus } from 'h3'
import { transactionService } from '../../services/transactionService'
import { getTransactionIdParam } from '../../utils/transactionRouteParams'

export default defineEventHandler(async (event) => {
  const transactionId = getTransactionIdParam(event)
  const wasDeleted = await transactionService.deleteTransaction(transactionId)

  if (!wasDeleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Transaction was not found.',
    })
  }

  setResponseStatus(event, 204)
})
