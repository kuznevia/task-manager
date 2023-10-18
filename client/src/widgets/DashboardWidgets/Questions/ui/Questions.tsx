import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import QuestionsApi from 'widgets/DashboardWidgets/Questions/api/questionsApiSlice';
import { Question } from 'widgets/DashboardWidgets/Questions/model/questionsTypes';
import { DeleteDataForm } from 'widgets/DashboardWidgets/Questions/ui/QuestionsForms/DeleteDataForm';
import { EditDataForm } from 'widgets/DashboardWidgets/Questions/ui/QuestionsForms/EditDataForm';

import { NestedAccrodions } from './Accordions/NestedAccordions';
import { QuestionDetails } from './QuestionDetails';
import * as S from './Questions.styled';

export const Questions = () => {
  const [data, setData] = useState<Question[]>([]);
  const [deletingId, setDeletingId] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question>();
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

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const response = await QuestionsApi.getAll();
    if (response.status === 200) {
      const data: Question[] = await response.json();
      setData(data);
    }
  };

  return (
    <>
      <S.Questions>
        <Heading>Interview Questions Database</Heading>
        <NestedAccrodions
          data={data}
          groupKey="group"
          setDeletingId={setDeletingId}
          onDeleteFormOpen={onDeleteFormOpen}
          setEditingQuestion={setEditingQuestion}
          onDetailsModalOpen={onDetailsModalOpen}
        />
        <Button onClick={onEditFormOpen}>Add data</Button>
      </S.Questions>
      <EditDataForm
        isOpen={isEditFormOpen}
        onClose={onEditFormClose}
        dataFetch={dataFetch}
        question={editingQuestion}
      />
      <DeleteDataForm
        isOpen={isDeleteFormOpen}
        onClose={onDeleteFormClose}
        dataFetch={dataFetch}
        deletingId={deletingId}
      />
      <QuestionDetails
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
