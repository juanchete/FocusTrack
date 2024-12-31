import { atom, map } from 'nanostores';
import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: Date;
}

export interface Todo {
  id: string;
  projectId: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const projects = atom<Project[]>([]);
export const todos = atom<Todo[]>([]);
export const currentProjectId = atom<string | null>(null);

// Mapa para rastrear qué proyectos ya mostraron la animación
export const completionAnimationShown = map<Record<string, boolean>>({});

// Función para marcar la animación como mostrada para un proyecto
export const markAnimationAsShown = (projectId: string) => {
  completionAnimationShown.setKey(projectId, true);
};

export async function createProject(name: string, color: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const newProject = {
    id: crypto.randomUUID(),
    user_id: user.id,
    name,
    color,
    created_at: new Date()
  };

  // Actualización optimista: agregamos el proyecto inmediatamente
  projects.set([newProject, ...projects.get()]);

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single();

    if (error) {
      // Si hay error, revertimos el cambio
      projects.set(projects.get().filter(p => p.id !== newProject.id));
      throw error;
    }

    // Actualizamos con los datos reales de la base de datos
    projects.set([data, ...projects.get().filter(p => p.id !== newProject.id)]);
    return data;
  } catch (error) {
    // Si hay error, revertimos el cambio
    projects.set(projects.get().filter(p => p.id !== newProject.id));
    throw error;
  }
}

export function addTask(projectId: string, text: string) {
  const todo: Todo = {
    id: crypto.randomUUID(),
    projectId,
    text: text.trim(),
    completed: false,
    createdAt: new Date()
  };
  todos.set([...todos.get(), todo]);
}

export function toggleTodo(id: string) {
  const currentTodos = todos.get();
  const updatedTodos = currentTodos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  todos.set(updatedTodos);
}

export function getProjectStats(projectId: string) {
  const projectTodos = todos.get().filter(todo => todo.projectId === projectId);
  return {
    total: projectTodos.length,
    completed: projectTodos.filter(todo => todo.completed).length
  };
}

// Función para cargar proyectos del usuario
export async function loadUserProjects() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  projects.set(data);
}