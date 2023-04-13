import { Button, CloseButton, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import TasksApi from 'api/tasksApiSlice';
import { Container } from 'components/Authorization/Authorization.styled';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type TasksResponse = {
  _id: string;
  name: string;
  deadline: Date;
};

export type TasksFormData = {
  name: string;
  deadline: Date;
};

export const TasksList = () => {
  const [tasks, setTasks] = useState<TasksResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<TasksFormData>();

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const response = await TasksApi.getAll();
    if (response.status === 200) {
      const data: TasksResponse[] = await response.json();
      setTasks(data);
    }
  };

  const onSubmit = async (data: TasksFormData) => {
    try {
      setIsSubmitting(true);
      const response = await TasksApi.create(data);
      setIsSubmitting(false);
      if (response.status === 200) {
        reset();
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      }
      dataFetch();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onDelete = (id: string) => async () => {
    try {
      setIsDeleting(true);
      const response = await TasksApi.delete(id);
      setIsDeleting(false);
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      }
      dataFetch();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Container>
      <Heading>Tasks Lists</Heading>
      {tasks.map((task) => (
        <Flex key={task._id} gap="10px" align="center">
          <p>{task.name}</p>
          <p>{format(new Date(task.deadline), 'dd/MM/yyyy')}</p>
          <CloseButton onClick={onDelete(task._id)} disabled={isDeleting} />
        </Flex>
      ))}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack spacing={3}>
          <Input
            {...register('name', {
              required: true,
            })}
            placeholder="Enter task"
          />
          <Input
            {...register('deadline', {
              required: true,
            })}
            placeholder="Select Date and Time"
            type="datetime-local"
          />
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Add task
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
