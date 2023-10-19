import React from 'react';
import { Question } from 'widgets/DashboardWidgets/Questions/model/questionsTypes';
import { DeleteDataModal } from 'widgets/DashboardWidgets/Questions/ui/QuestionsModals/modals/DeleteDataModal';
import { EditDataModal } from 'widgets/DashboardWidgets/Questions/ui/QuestionsModals/modals/EditDataModal';
import { QuestionDetailsModal } from 'widgets/DashboardWidgets/Questions/ui/QuestionsModals/modals/QuestionDetailsModal';

type Props = {
  disclousureProps: {
    isEditFormOpen: boolean;
    onEditFormOpen: () => void;
    onEditFormClose: () => void;
    isDeleteFormOpen: boolean;
    onDeleteFormOpen: () => void;
    onDeleteFormClose: () => void;
    isDetailsModalOpen: boolean;
    onDetailsModalOpen: () => void;
    onDetailsModalClose: () => void;
  };
  questionsProps: {
    deletingId: string;
    editingQuestion?: Question;
    dataFetch: () => Promise<void>;
    setEditingQuestion: React.Dispatch<React.SetStateAction<Question | undefined>>;
    setDeletingId: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const QuestionsModal = ({ disclousureProps, questionsProps }: Props) => {
  const {
    isEditFormOpen,
    onEditFormOpen,
    onEditFormClose,
    isDeleteFormOpen,
    onDeleteFormOpen,
    onDeleteFormClose,
    isDetailsModalOpen,
    onDetailsModalClose,
  } = disclousureProps;

  const { deletingId, editingQuestion, dataFetch, setDeletingId, setEditingQuestion } =
    questionsProps;
  return (
    <>
      <EditDataModal
        isOpen={isEditFormOpen}
        onClose={onEditFormClose}
        dataFetch={dataFetch}
        question={editingQuestion}
      />
      <DeleteDataModal
        isOpen={isDeleteFormOpen}
        onClose={onDeleteFormClose}
        dataFetch={dataFetch}
        deletingId={deletingId}
      />
      <QuestionDetailsModal
        question={editingQuestion}
        isOpen={isDetailsModalOpen}
        onEdit={() => {
          setEditingQuestion(editingQuestion);
          onEditFormOpen();
          onDetailsModalClose();
        }}
        onDelete={() => {
          setDeletingId(editingQuestion ? editingQuestion._id : '');
          onDeleteFormOpen();
          onDetailsModalClose();
        }}
        onClose={onDetailsModalClose}
      />
    </>
  );
};
