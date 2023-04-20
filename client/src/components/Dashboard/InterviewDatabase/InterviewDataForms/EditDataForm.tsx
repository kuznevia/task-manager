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
import InterviewApi from 'app/api/interviewApiSlice';
import { InterviewDBFormData } from 'app/types';
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
  const { register, handleSubmit, reset } = useForm<InterviewDBFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: InterviewDBFormData) => {
    try {
      setIsSubmitting(true);
      const response = await InterviewApi.create(data);
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
        <ModalHeader>Add Interview Database Element</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={3}>
              <Input
                {...register('name', {
                  required: true,
                })}
                placeholder="Enter name"
              />
              <Input
                {...register('group', {
                  required: true,
                })}
                placeholder="Enter data group"
              />
              <Input
                {...register('subGroup', {
                  required: true,
                })}
                placeholder="Enter data subgroup"
              />
              <Input {...register('link')} placeholder="Enter link" />
              <Input {...register('description')} placeholder="Enter description" />
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Add data
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
