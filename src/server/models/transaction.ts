import mongoose, { type HydratedDocument, type InferSchemaType, type Model } from 'mongoose'
import { TRANSACTION_CATEGORIES } from '../../utils/transaction'

const { Schema, model, models } = mongoose

const transactionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    category: {
      type: String,
      required: true,
      enum: TRANSACTION_CATEGORIES,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 180,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  },
)

transactionSchema.index({ date: -1, createdAt: -1 })

export type TransactionSchema = InferSchemaType<typeof transactionSchema>
export type TransactionDocument = HydratedDocument<TransactionSchema>

export const TransactionModel =
  (models.Transaction as Model<TransactionSchema> | undefined) ??
  model<TransactionSchema>('Transaction', transactionSchema)
