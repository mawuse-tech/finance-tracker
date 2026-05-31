<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p class="text-sm font-medium text-emerald-700">Personal finance</p>
      <h2 class="mt-1 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
        Your money at a glance
      </h2>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        Track balances, spending, budgets, and recent transaction activity from one responsive dashboard.
      </p>
    </div>

    <div class="flex gap-3">
      <button
        class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        type="button"
      >
        Export
      </button>
      <a
        href="#transaction-form"
        class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
      >
        Add transaction
      </a>
    </div>
  </div>
</template>
