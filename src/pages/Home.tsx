import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) {
      Alert.alert("Erro", "Você deve inserir um título para a tarefa");
      return;
    }
    const id = new Date().getTime();
    const title = newTaskTitle;
    const done = false;
    setTasks((prevState) => [...prevState, { id, title, done }]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prevState) => {
      const index = prevState.findIndex((t) => t.id === id);
      const newState = prevState.slice();
      newState[index].done = !newState[index].done;
      return newState;
    });
  }

  function handleRemoveTask(id: number) {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
