<script setup lang="ts">
import { ref, watch } from 'vue'
import { TRANSACTION_CATEGORIES, type TransactionFormData, type TransactionType } from '../../utils/transaction'

type FormErrors = Partial<Record<keyof TransactionFormData, string>>

const props = withDefaults(
  defineProps<{
    modelValue: TransactionFormData
    isSubmitting?: boolean
    submitLabel?: string
  }>(),
  {
    isSubmitting: false,
    submitLabel: 'Add transaction',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: TransactionFormData]
  submit: [value: TransactionFormData]
}>()

const transactionTypes: { label: string; value: TransactionType }[] = [
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
]

const cloneForm = (form: TransactionFormData): TransactionFormData => ({
  title: form.title,
  amount: form.amount,
  category: form.category,
  type: form.type,
  date: form.date,
  notes: form.notes,
})

const isSameForm = (left: TransactionFormData, right: TransactionFormData) =>
  left.title === right.title &&
  Object.is(left.amount, right.amount) &&
  left.category === right.category &&
  left.type === right.type &&
  left.date === right.date &&
  left.notes === right.notes

const form = ref<TransactionFormData>(cloneForm(props.modelValue))
const errors = ref<FormErrors>({})

watch(
  () => props.modelValue,
  (value) => {
    if (isSameForm(value, form.value)) {
      return
    }

    form.value = cloneForm(value)
  },
  { deep: true },
)

watch(
  form,
  (value) => {
    if (isSameForm(value, props.modelValue)) {
      return
    }

    emit('update:modelValue', cloneForm(value))
  },
  { deep: true },
)

const validateForm = () => {
  const nextErrors: FormErrors = {}

  if (!form.value.title.trim()) {
    nextErrors.title = 'Enter a transaction title.'
  }

  if (!Number.isFinite(form.value.amount) || form.value.amount <= 0) {
    nextErrors.amount = 'Enter an amount greater than zero.'
  }

  if (!form.value.category.trim()) {
    nextErrors.category = 'Choose a category.'
  }

  if (!form.value.date) {
    nextErrors.date = 'Choose a transaction date.'
  }

  if (form.value.notes.length > 180) {
    nextErrors.notes = 'Keep notes under 180 characters.'
  }

  errors.value = nextErrors

  return Object.keys(nextErrors).length === 0
}

const handleSubmit = () => {
  if (props.isSubmitting) {
    return
  }

  if (!validateForm()) {
    return
  }

  emit('submit', {
    title: form.value.title.trim(),
    amount: Number(form.value.amount),
    category: form.value.category,
    type: form.value.type,
    date: form.value.date,
    notes: form.value.notes.trim(),
  })
}
</script>

<template>
  <form class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-1">
      <h3 class="text-base font-semibold text-slate-950">Add transaction</h3>
      <p class="text-sm text-slate-500">Record income or expenses with a clear category and date.</p>
    </div>

    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <div class="md:col-span-2">
        <span class="text-sm font-medium text-slate-700">Transaction type</span>
        <div class="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
          <label
            v-for="transactionType in transactionTypes"
            :key="transactionType.value"
            :class="[
              'cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition',
              form.type === transactionType.value
                ? 'bg-white text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-950',
            ]"
          >
            <input v-model="form.type" class="sr-only" type="radio" :value="transactionType.value" />
            {{ transactionType.label }}
          </label>
        </div>
      </div>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Title</span>
        <input
          v-model="form.title"
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          type="text"
          placeholder="Grocery market"
        />
        <span v-if="errors.title" class="mt-1 block text-xs text-rose-600">{{ errors.title }}</span>
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Amount</span>
        <input
          v-model.number="form.amount"
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
        />
        <span v-if="errors.amount" class="mt-1 block text-xs text-rose-600">{{ errors.amount }}</span>
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Category</span>
        <select
          v-model="form.category"
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="" disabled>Select category</option>
          <option v-for="category in TRANSACTION_CATEGORIES" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <span v-if="errors.category" class="mt-1 block text-xs text-rose-600">{{ errors.category }}</span>
      </label>

      <label class="block">
        <span class="text-sm font-medium text-slate-700">Date</span>
        <input
          v-model="form.date"
          class="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          type="date"
        />
        <span v-if="errors.date" class="mt-1 block text-xs text-rose-600">{{ errors.date }}</span>
      </label>

      <label class="block md:col-span-2">
        <span class="text-sm font-medium text-slate-700">Notes</span>
        <textarea
          v-model="form.notes"
          class="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          placeholder="Optional details"
        ></textarea>
        <span v-if="errors.notes" class="mt-1 block text-xs text-rose-600">{{ errors.notes }}</span>
      </label>
    </div>

    <div class="mt-5 flex justify-end">
      <button
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        :disabled="isSubmitting"
        type="submit"
      >
        {{ isSubmitting ? 'Submitting...' : submitLabel }}
      </button>
    </div>
  </form>
</template>
