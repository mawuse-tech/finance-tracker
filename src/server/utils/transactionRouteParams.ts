import { createError, getRouterParam, type H3Event } from 'h3'

export const getTransactionIdParam = (event: H3Event) => {
  const transactionId = getRouterParam(event, 'id')

  if (!transactionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Transaction id is required.',
    })
  }

  return transactionId
}
