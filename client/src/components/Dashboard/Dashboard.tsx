import React, { useEffect, useState } from 'react';

type TasksResponse = {
  _id: string;
  name: string;
  deadline: Date;
};

export const Dashboard = () => {
  const [tasks, setTasks] = useState<TasksResponse[]>([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data: TasksResponse[] = await (
        await fetch('http://localhost:5000/api/tasks/')
      ).json();
      setTasks(data);
    };
    dataFetch();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>{task.name}</div>
      ))}
    </div>
  );
};
