import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [createdCount, setCreatedCount] = useState<number>(0);


  function handleAddTask(newTaskTitle: string) {
    if ((tasks.findIndex(task => task.id === 100)) !== -1) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.");
    }
    setTasks(prevState => [
      ...prevState, 
      {
        id: Date.now() * Math.random(),
        title: newTaskTitle,
        done: false,
      },
    ]);
    setCreatedCount(tasks.length+1)
  }

  function handleToggleTaskDone(id: number) {
    const index = tasks.findIndex(task => task.id === id)
    tasks[index].done = !tasks[index].done
    const tempTask = tasks[index]
    setTasks(prevState => prevState.filter(item => item.id !== id))
    setTasks(prevState => [
      ...prevState, 
      tempTask
    ]);
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => prevState.filter(item => item.id !== id))
    setCreatedCount(tasks.length-1)
  }
  
  useEffect(() => {
  }, [tasks])

  return (
    <View style={styles.container}>
      <Header tasksCounter={createdCount} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})