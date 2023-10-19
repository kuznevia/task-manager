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
} from '@chakra-ui/react';
import { todayString } from 'shared/helpers/date';
import { useModal } from 'widgets/DashboardWidgets/Tasks/hooks/useModal';
import { useTasks } from 'widgets/DashboardWidgets/Tasks/hooks/useTasks';
import { TasksModal } from 'widgets/DashboardWidgets/Tasks/ui/TasksModals/TasksModal';

import * as S from './Tasks.styled';

export const Tasks = () => {
  const {
    tasks,
    deletingId,
    setDeletingId,
    editingTask,
    setEditingTask,
    isTodayTasks,
    setIsTodaytasks,
    dataFetch,
  } = useTasks();

  const { disclousureProps } = useModal();

  const filteredTasks = isTodayTasks
    ? tasks.filter((task) => task.shortDescription?.includes(todayString))
    : tasks;

  return (
    <S.Tasks>
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
                    disclousureProps.onDetailsModalOpen();
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
                    disclousureProps.onEditFormOpen();
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
                    disclousureProps.onDeleteFormOpen();
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
            setEditingTask(undefined);
            disclousureProps.onEditFormOpen();
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
      <TasksModal
        disclousureProps={disclousureProps}
        tasksProps={{ deletingId, editingTask, dataFetch, setEditingTask, setDeletingId }}
      />
    </S.Tasks>
  );
};
