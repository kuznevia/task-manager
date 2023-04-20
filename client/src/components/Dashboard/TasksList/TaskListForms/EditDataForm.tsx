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
} from '@chakra-ui/react';
import TasksApi from 'app/api/tasksApiSlice';
import { TasksFormData } from 'app/types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const EditDataForm = ({
  isOpen,
  onClose,
  dataFetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataFetch: () => Promise<void>;
}) => {
  const { register, handleSubmit, reset } = useForm<TasksFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: TasksFormData) => {
    try {
      setIsSubmitting(true);
      const response = await TasksApi.create(data);
      setIsSubmitting(false);
      if (response.status === 200) {
        reset();
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
                {...register('name', {
                  required: true,
                })}
                placeholder="Enter task"
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close form
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
