import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import TasksApi from 'app/api/tasksApiSlice';
import { todayString } from 'app/helpers/date';
import { useFilter } from 'app/hooks/use-filter';
import { Task } from 'app/types';
import { Container } from 'components/Dashboard/Dashboard.styled';
import { DeleteDataForm } from 'components/Dashboard/TasksList/TaskListForms/DeleteDataForm';
import { EditDataForm } from 'components/Dashboard/TasksList/TaskListForms/EditDataForm';
import { isArray } from 'lodash';
import { useEffect, useState } from 'react';

import { TaskDetails } from './TaskDetails';

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deletingId, setDeletingId] = useState('');
  const [editingTask, setEditingTask] = useState<Task | []>([]);
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
  const {
    isOpen: isDetailsModalOpen,
    onOpen: onDetailsModalOpen,
    onClose: onDetailsModalClose,
  } = useDisclosure();

  const { isTodayTasks, setIsTodaytasks } = useFilter();

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

  const filteredTasks = isTodayTasks
    ? tasks.filter((task) => task.shortDescription?.includes(todayString))
    : tasks;

  return (
    <Container>
      <Heading>Tasks Lists</Heading>
      <Flex gap={6} padding={50} justify="center" wrap="wrap">
        {filteredTasks.map((task) => (
          <Card key={task._id} width={250}>
            <CardHeader>
              <Heading size="md">{task.title}</Heading>
            </CardHeader>
            <CardBody>
              {task.shortDescription && <Text>{task.shortDescription}</Text>}
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    setEditingTask(task);
                    onDetailsModalOpen();
                  }}
                  size="sm"
                >
                  Details
                </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    setEditingTask(task);
                    onEditFormOpen();
                  }}
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => {
                    setDeletingId(task._id);
                    onDeleteFormOpen();
                  }}
                  size="sm"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Flex>
      <ButtonGroup mb={75}>
        <Button
          onClick={() => {
            setEditingTask([]);
            onEditFormOpen();
          }}
        >
          Add task
        </Button>
        <Button
          onClick={() => {
            setIsTodaytasks(!isTodayTasks);
          }}
        >
          {isTodayTasks ? 'Get all tasks' : 'Get today tasks'}
        </Button>
      </ButtonGroup>
      <EditDataForm
        task={editingTask}
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
      <TaskDetails
        task={editingTask}
        isOpen={isDetailsModalOpen}
        onEdit={() => {
          setEditingTask(editingTask);
          onEditFormOpen();
          onDetailsModalClose();
        }}
        onDelete={() => {
          setDeletingId(isArray(editingTask) ? '' : editingTask._id);
          onDeleteFormOpen();
          onDetailsModalClose();
        }}
        onClose={onDetailsModalClose}
      />
    </Container>
  );
};
