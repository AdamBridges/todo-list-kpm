import {ActionDispatch} from 'react';

export type TaskProperties = {
  id: string, 
  name: string, 
  isEditing: boolean,
  done: boolean
};

export interface State {
   totalTasks: number,
   isAddingTask: boolean,
   tasks: Array<TaskProperties>
};

export enum TaskStateTypes {
    deleteAllTasks = "deleteAllTasks",
    setTotalTasks = "setTotalTasks",
    setIsAddingNewTask = "setIsAddingNewTask",
    setTasks = "setTasks",
    // setTask = "setTask",
    addTask = "addTask",
    editTask = "editTask",
    deleteTask = "deleteTask",
    updateTaskStatus = "updateTaskStatus",
}

enum TaskStateKeys {
    totalTasks = "totalTasks",
    isAddingTask = "isAddingTask",
    tasks = "tasks"
}

export type TaskListAction =
  | { type: TaskStateTypes.deleteAllTasks }
  | { type: TaskStateTypes.setTotalTasks; value: State[TaskStateKeys.totalTasks] }
  | { type: TaskStateTypes.setIsAddingNewTask; value: State[TaskStateKeys.isAddingTask] }
  | { type: TaskStateTypes.addTask; value: State[TaskStateKeys.tasks] }
  | { type: TaskStateTypes.deleteTask; value: State[TaskStateKeys.tasks] }
  | { type: TaskStateTypes.editTask; value: State[TaskStateKeys.tasks] }
  | { type: TaskStateTypes.updateTaskStatus; value: State[TaskStateKeys.tasks] }

export const initialState: State = { totalTasks: 0, isAddingTask: false, tasks: [] };

export function stateReducer(state: State, action: TaskListAction): State {
  console.debug("Reducer called with action:", action);
  
  switch (action.type) {
    case TaskStateTypes.deleteAllTasks:
      state = initialState;
      break;
    case TaskStateTypes.setIsAddingNewTask:
      state = { ...state, isAddingTask: action.value };
      break;
    case TaskStateTypes.addTask:
      state = { ...state, tasks: action.value, totalTasks: state.totalTasks + 1 };
      break;
    case TaskStateTypes.deleteTask:
      const updatedTasks: TaskProperties[] = state.tasks.filter(
        task => task.id !== action.value[0].id
      );
      state = { ...state, tasks: updatedTasks, totalTasks: state.totalTasks - 1 };
      break;
    case TaskStateTypes.editTask:
      const editedTasks = state.tasks.map(
        task => task.id === action.value[0].id 
        ? { ...task, isEditing: !task.isEditing, name: action.value[0].name } 
        : task
      );
      state = { ...state, tasks: editedTasks };
      break;
    case TaskStateTypes.updateTaskStatus:
      const updatedTaskStatus = state.tasks.map(task => 
        task.id === action.value[0].id ? { ...task, done: !task.done } : task
      );
      state = { ...state, tasks: updatedTaskStatus };
      break;
    default:
      throw new Error("Unknown action");
  }

  console.debug("Current state:", state);
  return state;
}

// Might try to implement this if I have time: 
export class HomePageViewModel {
    constructor() {
        initialState.tasks = this.getTasks();
        console.debug("HomePageViewModel initialized");
    }
    state = initialState;    

    addNewTask({ state, dispatch }: {
  state: State, dispatch: ActionDispatch<[action: TaskListAction]> 
}) {
        console.log("Adding new task | state:", this.state);
        this.state.totalTasks += 1;
        this.state.isAddingTask = true;
        
    };
    editTask() {}; 
    removeTaskFromList() {};
    updateTaskStatus() {};
    deleteAllTasks() {};
        
    getTasks() {
        const tasks: Array<TaskProperties> = [];
            return tasks;
        }
}

