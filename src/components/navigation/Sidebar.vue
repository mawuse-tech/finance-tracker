<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Component } from 'vue'
import {
  ChartBarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  Squares2X2Icon,
  WalletIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

type NavSection = 'dashboard' | 'transactions' | 'budgets' | 'savings' | 'reports'

type NavItem = {
  id: NavSection
  label: string
  href: string
  icon: Component
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '#dashboard',
    icon: Squares2X2Icon,
  },
  {
    id: 'transactions',
    label: 'Transactions',
    href: '#transactions',
    icon: ListBulletIcon,
  },
  {
    id: 'budgets',
    label: 'Budgets',
    href: '#budgets',
    icon: ChartPieIcon,
  },
  {
    id: 'savings',
    label: 'Savings',
    href: '#savings',
    icon: WalletIcon,
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '#reports',
    icon: ChartBarIcon,
  },
]

const secondaryItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Settings',
    href: '#',
    icon: Cog6ToothIcon,
  },
]

const activeSection = ref<NavSection>('dashboard')
let sectionObserver: IntersectionObserver | undefined

const getHashSection = (): NavSection => {
  if (typeof window === 'undefined') {
    return 'dashboard'
  }

  const hash = window.location.hash.replace('#', '')
  const matchingItem = navItems.find((item) => item.id === hash)

  return matchingItem?.id ?? 'dashboard'
}

const setActiveFromHash = () => {
  activeSection.value = getHashSection()
}

const handleNavClick = (section: NavSection) => {
  activeSection.value = section
  emit('close')
}

onMounted(() => {
  setActiveFromHash()
  window.addEventListener('hashchange', setActiveFromHash)

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((current, next) => next.intersectionRatio - current.intersectionRatio)[0]

      if (visibleSection) {
        activeSection.value = visibleSection.target.id as NavSection
      }
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0.1, 0.25, 0.5],
    },
  )

  navItems.forEach((item) => {
    const section = document.getElementById(item.id)

    if (section) {
      sectionObserver?.observe(section)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('hashchange', setActiveFromHash)
  sectionObserver?.disconnect()
})
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
        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
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
              activeSection === item.id
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
            ]"
            @click="handleNavClick(item.id)"
          >
            <component :is="item.icon" class="h-5 w-5" aria-hidden="true" />
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
            <component :is="item.icon" class="h-5 w-5" aria-hidden="true" />
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>
