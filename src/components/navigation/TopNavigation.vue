<script setup lang="ts">
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  openSidebar: []
}>()
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
      <button
        class="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 lg:hidden"
        type="button"
        aria-label="Open sidebar"
        @click="emit('openSidebar')"
      >
        <Bars3Icon class="h-5 w-5" aria-hidden="true" />
      </button>

      <div class="min-w-0 flex-1">
        <p class="text-xs font-medium uppercase tracking-normal text-slate-400">Overview</p>
        <h1 class="truncate text-lg font-semibold text-slate-950 sm:text-xl">Finance Dashboard</h1>
      </div>

      <label
        class="hidden min-w-72 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex"
      >
        <MagnifyingGlassIcon class="h-4 w-4" aria-hidden="true" />
        <span class="sr-only">Search transactions</span>
        <input
          class="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
          type="search"
          placeholder="Search transactions"
        />
      </label>

      <button
        class="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
        type="button"
        aria-label="View notifications"
      >
        <BellIcon class="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-1.5 pr-3 hover:bg-slate-100"
        type="button"
        aria-label="Open profile menu"
      >
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
          EA
        </span>
        <span class="hidden text-left sm:block">
          <span class="block text-sm font-medium text-slate-950">Essem</span>
          <span class="block text-xs text-slate-500">Owner</span>
        </span>
      </button>
    </div>
  </header>
</template>
