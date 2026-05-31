import { createError, readBody, type H3Event } from 'h3'
import {
  TRANSACTION_CATEGORIES,
  type TransactionFormData,
  type TransactionType,
} from '../../utils/transaction'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isTransactionType = (value: unknown): value is TransactionType =>
  value === 'income' || value === 'expense'

const isValidDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(new Date(`${value}T00:00:00`).getTime())

const validationError = (message: string) =>
  createError({
    statusCode: 422,
    statusMessage: message,
  })

export const readTransactionPayload = async (event: H3Event): Promise<TransactionFormData> => {
  const body = await readBody<unknown>(event)

  if (!isRecord(body)) {
    throw validationError('Transaction payload must be an object.')
  }

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const amount = Number(body.amount)
  const category = typeof body.category === 'string' ? body.category.trim() : ''
  const date = typeof body.date === 'string' ? body.date : ''
  const notes = typeof body.notes === 'string' ? body.notes.trim() : ''

  if (!title) {
    throw validationError('Transaction title is required.')
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw validationError('Transaction amount must be greater than zero.')
  }

  if (!TRANSACTION_CATEGORIES.includes(category)) {
    throw validationError('Transaction category is invalid.')
  }

  if (!isTransactionType(body.type)) {
    throw validationError('Transaction type must be income or expense.')
  }

  if (!isValidDate(date)) {
    throw validationError('Transaction date is invalid.')
  }

  if (notes.length > 180) {
    throw validationError('Transaction notes must be 180 characters or fewer.')
  }

  return {
    title,
    amount,
    category,
    type: body.type,
    date,
    notes,
  }
}
