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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import QuestionsApi from 'widgets/DashboardWidgets/Questions/api/questionsApiSlice';
import {
  Question,
  QuestionsFormData,
} from 'widgets/DashboardWidgets/Questions/model/questionsTypes';

export const EditDataForm = ({
  isOpen,
  onClose,
  dataFetch,
  question,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataFetch: () => Promise<void>;
  question?: Question;
}) => {
  const { register, handleSubmit, reset } = useForm<QuestionsFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (question) {
      reset({
        name: question.name,
        group: question.group,
        subGroup: question.subGroup,
        link: question.link,
        description: question.description,
      });
    } else {
      reset({
        name: undefined,
        group: undefined,
        subGroup: undefined,
        link: undefined,
        description: undefined,
      });
    }
  }, [question]);

  const onSubmit = async (data: QuestionsFormData) => {
    try {
      setIsSubmitting(true);
      const response = question
        ? await QuestionsApi.update({ _id: question._id, ...data })
        : await QuestionsApi.create(data);
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
                {question ? 'Edit data' : 'Add data'}
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
