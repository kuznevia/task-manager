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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
  group: string;
  subGroup: string;
  link?: string;
  description?: string;
};

export const EditDataForm = ({
  isOpen,
  onClose,
  dataFetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataFetch: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:5000/api/interviewData/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
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
