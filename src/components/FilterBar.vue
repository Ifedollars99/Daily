<template>
  <div class="flex flex-col w-full">
    <h1 class="text-gray-500 mb-2">Priority</h1>
    <div class="flex flex-wrap gap-2">
      <button v-for="priority in priorityOptions" :key="priority.value" @click="selectPriority(priority.value)"
        :class="[
        'px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2',
        selectedPriority === priority.value
        ? `${priority.selectedClass} text-white border-transparent`
        : `bg-white/50 text-gray-700 border-gray-400 hover:bg-white/70`
        ]">
        <span :class="priority.dotClass"></span>
        {{ priority.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPriority = ref('medium')

const priorityOptions = [
  {
    label: 'High',
    value: 'high',
    selectedClass: 'bg-red-500',
    dotClass: 'w-2 h-2 rounded-full bg-red-500'
  },
  {
    label: 'Med',
    value: 'medium',
    selectedClass: 'bg-yellow-500',
    dotClass: 'w-2 h-2 rounded-full bg-yellow-500'
  },
  {
    label: 'Low',
    value: 'low',
    selectedClass: 'bg-green-500',
    dotClass: 'w-2 h-2 rounded-full bg-green-500'
  }
]

const emit = defineEmits(['priority-changed'])

// Add this function
const selectPriority = (priority) => {
  selectedPriority.value = priority
  emit('priority-changed', priority)
}

// Emit initial value
emit('priority-changed', selectedPriority.value)
</script>

<style scoped></style>