'use client'

import { Button, Container, Group, MantineTheme, TextInput, Title, useMantineTheme } from '@mantine/core';
import {ActionDispatch, useReducer, useState} from 'react';
import { TaskStateTypes, stateReducer, State, TaskListAction, initialState, TaskProperties } from './home_page_viewModel';

export let state: State = initialState;
let dispatcher: ActionDispatch<[action: TaskListAction]>;
let theme: MantineTheme;

/** HomePageView component serves as the main view for the application.
 * It displays the title, a brief description, and a list of tasks.
 * It also includes a button to add new tasks and conditionally renders the TaskForm component for task creation.
 * @returns A container with the title, description, task list, and a button to add new tasks.
 * @component
 * @example
 * ```jsx
 * <HomePageView />
 * ```
 */
export function HomePageView() {
    console.log("HomePageView component rendered");
 
    const [stateValue, dispatch] = useReducer(stateReducer, initialState);
    state = stateValue;
    dispatcher = dispatch;
    theme = useMantineTheme();

    const addNewTask = () => dispatch({ type: TaskStateTypes.setIsAddingNewTask, value: true });

    return (
    <Container size="md" style={{ padding: '2rem' }}>
        <Title>KPM To Do List</Title>
        <p>Time to start getting those tasks written down!</p>
        <br />
        <TaskList />
        <br />
        <p >Total tasks to do: {state.totalTasks}</p>
        <br/>
        <Group justify='right' align='center'>
          {!state.isAddingTask && <Button onClick={addNewTask} m={8} justify='center'>
            New Task
            </Button>}
          </Group>
        {state.isAddingTask && <TaskForm />}
    </Container>
);
}

/**
 * 
 * @returns A list of tasks with options to edit, delete, or mark as done.
 */
function TaskList() {
  return (
  <div>
    <Title order={2} pb={15}>Tasks to do: </Title>
    {state.tasks.length > 0 ? (
      state.tasks.map((task) => (
        !task.isEditing 
        ? <TaskTile key={task.id} {...task} /> 
        : <TaskForm key={task.id} task={task} />
      ))
    ) : (
      <p>No tasks available.</p>
    )}
  </div>
  );
}

/** Component for displaying a single task tile.
 * It includes buttons for deleting, editing, and updating the task status.
  * @param task - The task properties to display.
*/
function TaskTile(task: TaskProperties) {
  const deleteTask = () => dispatcher({ 
    type: TaskStateTypes.deleteTask, 
    value: [task] 
  });
  const updateTaskStatus = () => dispatcher({ 
    type: TaskStateTypes.updateTaskStatus, 
    value: [task] 
  });
  const editTask = () => dispatcher({ 
    type: TaskStateTypes.editTask, 
    value: [task] 
  });

  return (
    <Container 
    p={"md"}  
    bg={theme.colors.gray[1]} 
    mb="md" 
    opacity={task.done ? 0.5 : 1}
    style={{ 
      borderRadius: '8px', 
      borderColor: theme.colors.gray[3], 
      borderStyle: 'solid', 
      borderWidth: '1px' 
    }}
    >
      <Title order={3} style={{fontWeight:'300'}}>{task.name}</Title>
        <Group gap={"xs"} justify="flex-end" mt="md">
          <Button 
          variant="outline" 
          color="red" 
          onClick={deleteTask}
        >
          Delete
        </Button>
        <Button 
          variant="outline" 
          color="grey" 
          onClick={editTask}
        >
          Edit
        </Button>
        <Button 
          color={theme.colors.green[6]} 
          onClick={updateTaskStatus}
          variant={task.done ? 'filled' : 'outline'}
        >
          Done
        </Button>
        </Group>
    </Container>
  );
}

/** Component for creating and editing tasks. */ 
function TaskForm({task}: {task?: TaskProperties}) {
  const [taskValue, setTaskValue] = useState<string>(task?.name ?? '');
  
  

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentValue: string = event.currentTarget.value;
    setTaskValue(currentValue);
  }

  return (
    <Container 
      p={"md"}  
    bg={theme.colors.gray[1]} 
    mb="md" 
    style={{ 
      borderRadius: '8px', 
      borderColor: theme.colors.gray[3], 
      borderStyle: 'solid', 
      borderWidth: '1px' 
    }}
    >
        <TextInput 
        value={taskValue} 
        onChange={handleChange} 
        label={task ? "Edit Task" : "New Task"} 
        labelProps={{ style: { paddingBottom:'16px' } }}
        placeholder={"Enter task name: Meet Adam Bridges"}/>
        
        <Group justify="right" mt="xl">
          <Button 
            onClick={() => task ? cancelTaskEdit(task) : cancelTask()}
            variant="outline" 
            color="grey" 
          >
            Cancel
          </Button>
          <Button onClick={() => task 
            ? editTask(task, taskValue) 
            : createTask(taskValue)}>
              {task ? 'Update' : 'Create'}
            </Button>
      </Group>
    </Container>
  );
}

export function createTask(taskValue?: string) {
    const tValue = taskValue?.trim();
    const isNotEmpty: boolean = tValue != undefined && tValue?.length > 0;

    if (isNotEmpty) {
      const taskProp: TaskProperties = {
        id: new Date().getTime().toString(),
        name: taskValue!,
        isEditing: false,
        done: false
      };
      dispatcher({ type: TaskStateTypes.addTask, value: [...state.tasks, taskProp] });
} else {
      return cancelTask();
    }
  }

  function cancelTask() {
    return dispatcher({ 
    type: TaskStateTypes.setIsAddingNewTask, 
    value: false
  });
  }

export function editTask(task: TaskProperties, taskValue?: string) {
    const tValue = taskValue?.trim();
    const isNotEmpty: boolean = tValue != undefined && tValue?.length > 0;

    if (isNotEmpty) {
      const taskProp: TaskProperties = {
        id: task!.id,
        name: taskValue!,
        isEditing: task!.isEditing,
        done: task!.done
      };
      dispatcher({ type: TaskStateTypes.editTask, value: [taskProp] });
    }
    return cancelTask();
  }

  function cancelTaskEdit(task: TaskProperties) {
    return dispatcher({ 
    type: TaskStateTypes.editTask, 
    value: [task!]
  });
  }
