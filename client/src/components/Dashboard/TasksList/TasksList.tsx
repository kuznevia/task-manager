import { Button, CloseButton, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import { Wrapper } from 'components/Authorization/Authorization.styled';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type TasksResponse = {
  _id: string;
  name: string;
  deadline: Date;
};

type FormData = {
  name: string;
  deadline: Date;
};

export const TasksList = () => {
  const [tasks, setTasks] = useState<TasksResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (token && userId) {
      const dataFetch = async () => {
        const data: TasksResponse[] = await (
          await fetch(
            'http://localhost:5000/api/tasks?' + new URLSearchParams({ userId }),
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
        ).json();
        setTasks(data);
      };
      dataFetch();
    }
  }, [isSubmitting, isDeleting]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const onSubmit = async (data: FormData) => {
    const dataToSend = {
      userId,
      ...data,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:5000/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(dataToSend),
      });
      setIsSubmitting(false);
      if (response.status === 200) {
        reset();
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onDelete = (id: string) => async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleting(false);
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Heading>Tasks Lists</Heading>
      {tasks.map((task) => (
        <Flex key={task._id} gap="10px" align="center">
          <p>{task.name}</p>
          <p>{format(new Date(task.deadline), 'dd/MM/yyyy')}</p>
          <CloseButton onClick={onDelete(task._id)} />
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
        </Stack>
      </form>
    </Wrapper>
  );
};
