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
  const token = localStorage.getItem('token');

  const onDelete = (id: string) => async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:5000/api/interviewData/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
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
        <ModalHeader>Sure you want delete?</ModalHeader>
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
