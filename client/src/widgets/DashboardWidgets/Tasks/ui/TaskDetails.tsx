import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Task } from 'widgets/DashboardWidgets/Tasks/model/tasksTypes';

export const TaskDetails = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  task?: Task;
}) => {
  if (!task) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{task.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{task.description}</ModalBody>
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
