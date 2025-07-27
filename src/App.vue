<template>
  <main>
    <div class="bg-gray-200 w-full h-full md:h-screen flex flex-col items-center justify-start py-5 px-10">
      <h1 class="text-black text-5xl self-start">Tasks</h1>

      <div class="w-full mt-8">
        <div v-if="tasks.length === 0" class="text-center py-20" data-aos="fade-left">
          <img src="https://i.pinimg.com/736x/43/3a/17/433a1720cd3a24cb8aedecda049ee0b3.jpg" alt=""
            class="mx-auto mb-4 hover:scale-110">
          <h1 class="text-gray-700 text-2xl">Add your Tasks in the blue button below</h1>
        </div>

        <div v-else class="space-y-4" data-aos="fade-up">
          <div v-for="task in tasks" :key="task.id"
            class="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ task.text }}</h3>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <i class="bi bi-calendar"></i>
                    {{ formatDay(task.day, task.date) }}
                  </span>
                  <span class="flex items-center gap-2">
                    <span :class="getPriorityDotClass(task.priority)"></span>
                    {{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }} Priority
                  </span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <button @click="editTask(task)"
                  class="text-black hover:text-green-700 text-sm border border-green-700 p-2 rounded-lg">
                  Edit
                </button>
                <button @click="removeTask(task.id)" class="text-red-500 hover:text-red-700 text-xl">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="showModal = true" data-aos="fade-up"
        class="fixed bottom-6 right-6 bg-blue-800 text-white px-4 py-2 md:px-7 md:py-5 shadow-lg transition duration-300 hover:scale-110 z-50 rounded-xl">
        <i class="bi bi-plus-lg text-5xl text-white"></i>
      </button>
    </div>

    <div>
      <AddTaskModal v-if="showModal" @task-added="(newTask) => { tasks.push(newTask); showModal = false; }"
        @close-modal="showModal = false" />
      <AddTaskModal v-if="showEditModal" :editing-task="editingTask" @task-added="handleTaskEdited"
        @close-modal="closeEditModal" />  
    </div>

    <router-view />
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AddTaskModal from '@/views/AddTaskModal.vue'

const tasks = ref([])
const showModal = ref(false)
const editingTask = ref(null)
const showEditModal = ref(false)


const removeTask = (taskId) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId)
}

const formatDay = (day, date) => {
  if (day === 'custom') return date
  return day.charAt(0).toUpperCase() + day.slice(1)
}

const getPriorityDotClass = (priority) => {
  const classes = {
    high: 'w-3 h-3 rounded-full bg-red-500',
    medium: 'w-3 h-3 rounded-full bg-yellow-500',
    low: 'w-3 h-3 rounded-full bg-green-500'
  }
  return classes[priority] || classes.medium
}

const editTask = (task) => {
  editingTask.value = { ...task } // Create a copy of the task
  showEditModal.value = true
}

const handleTaskEdited = (updatedTask) => {
  const index = tasks.value.findIndex(task => task.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
  showEditModal.value = false
  editingTask.value = null
}

const closeEditModal = () => {
  showEditModal.value = false
  editingTask.value = null
}

// Add these new functions after your existing functions:
const saveTasksToStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

const loadTasksFromStorage = () => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
}

// Add onMounted to load tasks when component mounts
onMounted(() => {
  loadTasksFromStorage()
})

// Add watcher to save tasks whenever they change
watch(tasks, () => {
  saveTasksToStorage()
}, { deep: true })
</script>

<style></style>