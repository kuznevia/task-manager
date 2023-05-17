import {
  Button,
  ButtonGroup,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Question } from 'app/types';
import React from 'react';

export const QuestionDetails = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  question,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  question?: Question;
}) => {
  if (!question) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{question.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {question.description || (
            <Link color="blue.600" href={question.link}>
              Ссылка
            </Link>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={2}>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={onDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
