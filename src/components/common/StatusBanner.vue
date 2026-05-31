<script setup lang="ts">
defineProps<{
  errorMessage: string
  isLoading: boolean
}>()
</script>

<template>
  <div
    v-if="isLoading || errorMessage"
    :class="[
      'rounded-lg border px-4 py-3 text-sm',
      errorMessage
        ? 'border-amber-200 bg-amber-50 text-amber-800'
        : 'border-blue-200 bg-blue-50 text-blue-800',
    ]"
  >
    {{ errorMessage || 'Loading transactions from the database...' }}
  </div>
</template>
