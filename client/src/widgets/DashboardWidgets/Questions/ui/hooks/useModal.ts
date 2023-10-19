import { useDisclosure } from '@chakra-ui/react';

export const useModal = () => {
  const {
    isOpen: isEditFormOpen,
    onOpen: onEditFormOpen,
    onClose: onEditFormClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteFormOpen,
    onOpen: onDeleteFormOpen,
    onClose: onDeleteFormClose,
  } = useDisclosure();
  const {
    isOpen: isDetailsModalOpen,
    onOpen: onDetailsModalOpen,
    onClose: onDetailsModalClose,
  } = useDisclosure();

  return {
    disclousureProps: {
      isEditFormOpen,
      onEditFormOpen,
      onEditFormClose,
      isDeleteFormOpen,
      onDeleteFormOpen,
      onDeleteFormClose,
      isDetailsModalOpen,
      onDetailsModalOpen,
      onDetailsModalClose,
    },
  };
};
