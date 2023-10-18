import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TasksApi from 'widgets/DashboardWidgets/Tasks/api/tasksApiSlice';
import { Task, TasksFormData } from 'widgets/DashboardWidgets/Tasks/model/tasksTypes';

export const EditDataForm = ({
  isOpen,
  onClose,
  dataFetch,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataFetch: () => Promise<void>;
  task?: Task;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TasksFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        shortDescription: task.shortDescription,
        description: task.description,
      });
    } else {
      reset({
        title: undefined,
        shortDescription: undefined,
        description: undefined,
      });
    }
  }, [task]);

  const onSubmit = async (data: TasksFormData) => {
    try {
      setIsSubmitting(true);
      const response = task
        ? await TasksApi.update({ _id: task._id, ...data })
        : await TasksApi.create(data);
      setIsSubmitting(false);
      if (response.status === 200) {
        onClose();
        dataFetch();
      } else {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={3}>
              <Input
                {...register('title', {
                  required: true,
                })}
                errorBorderColor="red.300"
                isInvalid={errors.title ? true : false}
                focusBorderColor={errors.title && 'red.300'}
                placeholder={errors.title ? 'Task title is required' : 'Enter task title'}
                _placeholder={{ color: errors.title && 'red.300' }}
              />
              <Input
                {...register('shortDescription', {
                  maxLength: 50,
                })}
                isInvalid={errors.shortDescription ? true : false}
                focusBorderColor={errors.shortDescription && 'red.300'}
                errorBorderColor="red.300"
                placeholder="Enter short description"
              />
              {errors.shortDescription?.type === 'maxLength' && (
                <Text fontSize="md" color="red.300">
                  Maximum length is 50
                </Text>
              )}
              <Textarea
                {...register('description', {
                  required: true,
                })}
                errorBorderColor="red.300"
                isInvalid={errors.description ? true : false}
                focusBorderColor={errors.description && 'red.300'}
                placeholder={
                  errors.description ? 'Description is required' : 'Enter description'
                }
                _placeholder={{ color: errors.description && 'red.300' }}
              />
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
                disabled={isSubmitting}
              >
                {task ? 'Edit task' : 'Add task'}
              </Button>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
