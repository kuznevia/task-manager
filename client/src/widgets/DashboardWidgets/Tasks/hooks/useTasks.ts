import { useEffect, useState } from 'react';
import TasksApi from 'widgets/DashboardWidgets/Tasks/api/tasksApiSlice';
import { Task } from 'widgets/DashboardWidgets/Tasks/model/tasksTypes';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deletingId, setDeletingId] = useState('');
  const [editingTask, setEditingTask] = useState<Task>();
  const [isTodayTasks, setIsTodaytasks] = useState(false);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const response = await TasksApi.getAll();
    if (response.status === 200) {
      const data: Task[] = await response.json();
      setTasks(data);
    }
  };

  return {
    tasks,
    setTasks,
    deletingId,
    setDeletingId,
    editingTask,
    setEditingTask,
    isTodayTasks,
    setIsTodaytasks,
    dataFetch,
  };
};
