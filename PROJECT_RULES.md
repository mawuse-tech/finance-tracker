# PROJECT_RULES.md

# Personal Finance Tracker - Project Rules

## Project Overview

This project is a modern Personal Finance Tracker built with:

* Vue 3
* Nuxt 3
* Vite
* Tailwind CSS
* Pinia
* Vue Router
* Composition API

The goal is to maintain clean, scalable, reusable, and beginner-friendly architecture.

---

# Core Development Rules

## Vue Standards

* Use Vue 3 Composition API only
* Use `<script setup>`
* Use `ref` and `computed` properly
* Keep logic modular and reusable
* Use reactive state correctly
* Avoid mixing Options API with Composition API

---

# Styling Rules

* Use Tailwind CSS only
* Do not use inline CSS styles
* Avoid custom CSS unless absolutely necessary
* Use responsive mobile-first layouts
* Maintain consistent spacing and typography
* Keep UI modern and clean

---

# Component Rules

* Keep components small and reusable
* One component should focus on one responsibility
* Use props and emits correctly
* Avoid very large components
* Reuse UI components whenever possible

Examples:

* SummaryCard.vue
* TransactionForm.vue
* TransactionList.vue
* Sidebar.vue

---

# Folder Structure Rules

Use this structure:

src/
│
├── assets/
├── components/
├── views/
├── stores/
├── services/
├── composables/
├── layouts/
├── utils/
├── router/
├── App.vue
└── main.js

---

# API Rules

* Use async/await
* Handle loading states
* Handle errors properly
* Keep API logic inside `/services`
* Do not place API calls directly inside UI components unless necessary

---

# State Management Rules

* Use Pinia for global state
* Keep business logic inside stores
* Use computed values for totals and summaries
* Keep stores clean and modular

---

# Finance App Rules

Transactions must include:

* id
* title
* amount
* category
* type (income or expense)
* date
* notes

The app should support:

* adding transactions
* deleting transactions
* filtering transactions
* calculating totals
* dashboard summaries
* charts and analytics

---

# Code Quality Rules

* Use clean naming conventions
* Avoid duplicate code
* Keep files organized
* Write readable beginner-friendly code
* Add comments only when necessary
* Refactor repeated logic into composables or reusable components

---

# Performance Rules

* Avoid unnecessary re-renders
* Keep components lightweight
* Use computed properties when appropriate
* Lazy-load pages when possible

---

# Responsiveness Rules

The app must work properly on:

* mobile
* tablet
* desktop

All layouts should be responsive using Tailwind CSS.

---

# Git Rules

* Make small meaningful commits
* Use clear commit messages
* Keep project structure organized

Examples:

* feat: create transaction form
* fix: resolve balance calculation bug
* refactor: improve store structure

---

# Testing Rules

* Ensure components render correctly
* Fix broken tests immediately
* Keep app functionality stable after refactors

---

# Important Instructions For AI Tools

When generating code:

* Follow all rules in this file
* Do not generate unnecessary complexity
* Do not redesign the UI unless instructed
* Keep architecture clean and scalable
* Prefer reusable solutions over duplicated code
* Explain generated code clearly when asked

---

# Final Goal

The final application should resemble a modern SaaS finance dashboard with:

* clean architecture
* reusable components
* responsive design
* scalable state management
* maintainable codebase
