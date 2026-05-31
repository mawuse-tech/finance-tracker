<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/navigation/Sidebar.vue'
import TopNavigation from '../components/navigation/TopNavigation.vue'

const isSidebarOpen = ref(false)

const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-950">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
      aria-hidden="true"
      @click="closeSidebar"
    ></div>

    <Sidebar :is-open="isSidebarOpen" @close="closeSidebar" />

    <div class="min-h-screen lg:pl-72">
      <TopNavigation @open-sidebar="openSidebar" />

      <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
