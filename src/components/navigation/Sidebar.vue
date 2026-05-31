<script setup lang="ts">
type NavItem = {
  label: string
  href: string
  active: boolean
  iconPath: string
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '#',
    active: true,
    iconPath:
      'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z',
  },
  {
    label: 'Transactions',
    href: '#',
    active: false,
    iconPath:
      'M7 7h10M7 12h10M7 17h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z',
  },
  {
    label: 'Budgets',
    href: '#',
    active: false,
    iconPath:
      'M12 3a9 9 0 1 0 9 9h-9V3Zm2 0v7h7a9 9 0 0 0-7-7Z',
  },
  {
    label: 'Savings',
    href: '#',
    active: false,
    iconPath:
      'M5 11h14M7 11V8a5 5 0 0 1 10 0v3M6 11v8h12v-8M10 15h4',
  },
  {
    label: 'Reports',
    href: '#',
    active: false,
    iconPath: 'M4 19V5m5 14V9m5 10V3m5 16v-7',
  },
]

const secondaryItems: NavItem[] = [
  {
    label: 'Settings',
    href: '#',
    active: false,
    iconPath:
      'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8 4a8 8 0 0 0-.2-1.8l2-1.5-2-3.4-2.4 1a8 8 0 0 0-3.1-1.8L14 2h-4l-.3 2.5a8 8 0 0 0-3.1 1.8l-2.4-1-2 3.4 2 1.5A8 8 0 0 0 4 12c0 .6.1 1.2.2 1.8l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 3.1 1.8L10 22h4l.3-2.5a8 8 0 0 0 3.1-1.8l2.4 1 2-3.4-2-1.5c.1-.6.2-1.2.2-1.8Z',
  },
]
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
    aria-label="Sidebar navigation"
  >
    <div class="flex h-16 items-center justify-between border-b border-slate-200 px-5">
      <a class="flex items-center gap-3" href="#">
        <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-sm font-semibold text-white">
          FT
        </span>
        <span>
          <span class="block text-sm font-semibold text-slate-950">Finance Tracker</span>
          <span class="block text-xs text-slate-500">Personal dashboard</span>
        </span>
      </a>

      <button
        class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        type="button"
        aria-label="Close sidebar"
        @click="emit('close')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <nav class="flex flex-1 flex-col gap-6 px-4 py-5">
      <div>
        <p class="px-3 text-xs font-medium uppercase tracking-normal text-slate-400">Menu</p>
        <div class="mt-3 space-y-1">
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.href"
            :class="[
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
              item.active
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
            ]"
            @click="emit('close')"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                :d="item.iconPath"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ item.label }}
          </a>
        </div>
      </div>

      <div class="mt-auto">
        <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p class="text-sm font-semibold text-slate-950">Monthly goal</p>
          <p class="mt-1 text-xs text-slate-500">You are 78% toward your savings target.</p>
          <div class="mt-4 h-2 rounded-full bg-slate-200">
            <div class="h-2 w-3/4 rounded-full bg-emerald-500"></div>
          </div>
        </div>

        <div class="mt-4 space-y-1">
          <a
            v-for="item in secondaryItems"
            :key="item.label"
            :href="item.href"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            @click="emit('close')"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                :d="item.iconPath"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>
