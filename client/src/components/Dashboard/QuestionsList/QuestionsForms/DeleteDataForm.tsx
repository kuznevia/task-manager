import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import InterviewApi from 'app/api/interviewApiSlice';
import { useState } from 'react';

export const DeleteDataForm = ({
  isOpen,
  onClose,
  dataFetch,
  deletingId,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataFetch: () => Promise<void>;
  deletingId: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = (id: string) => async () => {
    try {
      setIsDeleting(true);
      const response = await InterviewApi.delete(id);
      setIsDeleting(false);
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(await response.json());
      } else {
        onClose();
        dataFetch();
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
        <ModalHeader>Sure you want to delete?</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button
            colorScheme="red"
            onClick={onDelete(deletingId)}
            isLoading={isDeleting}
            loadingText="Deleting"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
