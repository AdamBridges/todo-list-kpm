import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { createTask, editTask, state } from '@/app/pages/home/home_page_view'
import { act } from 'react'

test('create, edit, and delete a single task', () => {
  act(() => {
    render(<Page />)
  });

  // Simulate adding a new task:
  const newTaskButton = screen.getByRole('button', { name: /New Task/i });
  expect(newTaskButton).toBeInTheDocument();
  act(() => {
    newTaskButton.click();
  });
  expect(state.isAddingTask).toBe(true);
  const taskInput = screen.getByPlaceholderText(/Enter task name/i);
  expect(taskInput).toBeInTheDocument();

  // Simulate entering a task name:
  let taskName = 'Test Task';
  act(() => {
    createTask(taskName);
  });
  const taskData = () => state.tasks.find(task => task.name === taskName);
  expect(taskData()?.name).toBe(taskName);

  // Check if the task appears in the list: 
  let taskItem = screen.getByText(taskName);
  expect(taskItem).toBeInTheDocument();

  // Simulate editing the task: 
  const editButton = screen.getByRole('button', { name: /Edit/i });
  act(() => {
    editButton.click();
  });
  let editedTaskData = taskData();
  expect(editedTaskData!.isEditing).toBe(true);

  // Check if the input is populated with the task name: 
  expect(editedTaskData!.name).toBe(taskName);

  // Simulate changing the task name: 
  taskName = 'Updated Task Name';
  act(() => {
    editTask(editedTaskData!, taskName);
  });
  editedTaskData = taskData();
  expect(editedTaskData!.isEditing).toBe(false);
  expect(editedTaskData!.name).toBe(taskName);

  // Simulate deleting the task
  taskItem = screen.getByText(taskName);
  expect(taskItem).toBeInTheDocument();
  const deleteButton = screen.getByRole('button', { name: /Delete/i });
  act(() => {
    deleteButton.click();
  });
  
  // Check if the task is removed from the list
  expect(taskItem).not.toBeInTheDocument();
})