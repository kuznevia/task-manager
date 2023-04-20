import { Button, CloseButton, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import TasksApi from 'app/api/tasksApiSlice';
import { TasksResponse } from 'app/types';
import { Container } from 'components/Dashboard/Dashboard.styled';
import { DeleteDataForm } from 'components/Dashboard/TasksList/TaskListForms/DeleteDataForm';
import { EditDataForm } from 'components/Dashboard/TasksList/TaskListForms/EditDataForm';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export const TasksList = () => {
  const [tasks, setTasks] = useState<TasksResponse[]>([]);
  const [deletingId, setDeletingId] = useState('');
  const {
    isOpen: isEditFormOpen,
    onOpen: onEditFormOpen,
    onClose: onEditFormClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteFormOpen,
    onOpen: onDeleteFormOpen,
    onClose: onDeleteFormClose,
  } = useDisclosure();

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

  return (
    <Container>
      <Heading>Tasks Lists</Heading>
      {tasks.map((task) => (
        <Flex key={task._id} gap="10px" align="center">
          <p>{task.name}</p>
          {task.deadline && <p>{format(new Date(task.deadline), 'dd/MM/yyyy')}</p>}
          <CloseButton
            onClick={() => {
              setDeletingId(task._id);
              onDeleteFormOpen();
            }}
          />
        </Flex>
      ))}
      <Button onClick={onEditFormOpen}>Add data</Button>
      <EditDataForm
        isOpen={isEditFormOpen}
        onClose={onEditFormClose}
        dataFetch={dataFetch}
      />
      <DeleteDataForm
        isOpen={isDeleteFormOpen}
        onClose={onDeleteFormClose}
        dataFetch={dataFetch}
        deletingId={deletingId}
      />
    </Container>
  );
};
