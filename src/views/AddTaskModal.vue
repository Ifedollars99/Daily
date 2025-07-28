<template>
    <div
        class="absolute top-32 right-10 md:top-24 md:right-20  bg-white/30 backdrop-blur-md rounded-2xl shadow-lg z-50 px-8 py-3 w-5/6 md:w-2/5 h-[500px] flex items-start gap-5 justify-start flex-col">
        <button @click="$emit('close-modal')" class="bi bi-x-square text-black text-4xl font-bold self-start"></button>
        <p class="text-4xl text-black font-bold self-center">
            {{ props.editingTask ? 'Edit Task' : 'Add Task' }}
        </p>

        <div class="flex flex-col">
            <h1 class="text-gray-500">Task</h1>
            <input v-model="taskText" type="text" placeholder="What needs to be done?"
                class="px-3 md:px-10 py-2  placeholder:text-gray-500 rounded-lg border border-gray-500">
        </div>

        <div class="flex flex-col w-full gap-4">
            <div class="flex flex-col">
                <h1 class="text-gray-500">When</h1>
                <div class="flex flex-wrap gap-2 mb-3">
                    <button v-for="day in dayOptions" :key="day.value" @click="selectedDay = day.value" :class="[
                        'px-4 py-2 rounded-lg border transition-all duration-200',
                        selectedDay === day.value
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white/50 text-gray-700 border-gray-400 hover:bg-white/70'
                    ]">
                        {{ day.label }}
                    </button>
                </div>
                <input v-if="selectedDay === 'custom'" v-model="customDate" type="date"
                    class="px-4 py-2 rounded-lg border border-gray-500 text-gray-700">
            </div>


            <div>
                <FilterBar @priority-changed="selectedPriority = $event" />
            </div>

            <!-- add button  -->
            <div @click="addTask"
                class="fixed bottom-6 right-6 bg-blue-800 text-white px-2 py-1 md:px-5 md:py-3 shadow-2xl transition duration-300 z-50 rounded-xl">
                <i class="bi bi-plus-lg text-5xl text-white"></i>
            </div>

        </div>

    </div>
</template>



<script setup>

import { ref, watchEffect } from 'vue';
import FilterBar from '@/components/FilterBar.vue'

const props = defineProps({
    editingTask: {
        type: Object,
        default: null
    }
})

const taskText = ref('')
const customDate = ref('')
const selectedPriority = ref('medium')
const selectedDay = ref('today')
const emit = defineEmits(['task-added'])

// Use watchEffect to handle props reactively
watchEffect(() => {
    if (props.editingTask) {
        taskText.value = props.editingTask.text
        customDate.value = props.editingTask.date
        selectedPriority.value = props.editingTask.priority
        selectedDay.value = props.editingTask.day
    } else {
        // Reset to defaults when not editing
        taskText.value = ''
        customDate.value = ''
        selectedPriority.value = 'medium'
        selectedDay.value = 'today'
    }
})

const addTask = () => {
    console.log('AddTask button clicked!')

    if (!taskText.value.trim()) {
        alert('Please enter a task!')
        return
    }

    const taskData = {
        text: taskText.value,
        day: selectedDay.value,
        date: selectedDay.value === 'custom' ? customDate.value : selectedDay.value,
        priority: selectedPriority.value,
        id: props.editingTask ? props.editingTask.id : Date.now()
    }

    console.log('About to emit task:', taskData)
    emit('task-added', taskData)

    // Clear form
    taskText.value = ''
    customDate.value = ''
    selectedDay.value = 'today'

    // Show success message
    alert(props.editingTask ? 'Task updated successfully!' : 'Task added successfully! Click X to go back.')
}

const dayOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'Custom Date', value: 'custom' }
]

</script>

<style scoped></style>