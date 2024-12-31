import { atom } from 'nanostores';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const todos = atom<Todo[]>([]);

export function addTodos(text: string) {
  const sentences = text.split(/[.!?]\s+/)
    .filter(sentence => sentence.trim().length > 0)
    .map(sentence => ({
      id: crypto.randomUUID(),
      text: sentence.trim(),
      completed: false
    }));
  
  todos.set([...todos.get(), ...sentences]);
}

export function toggleTodo(id: string) {
  const currentTodos = todos.get();
  const updatedTodos = currentTodos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  todos.set(updatedTodos);
}

export function areAllTodosCompleted() {
  const currentTodos = todos.get();
  return currentTodos.length > 0 && currentTodos.every(todo => todo.completed);
}