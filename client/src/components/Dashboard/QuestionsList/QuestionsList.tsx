import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import InterviewApi from 'app/api/interviewApiSlice';
import { Question } from 'app/types';
import { Container } from 'components/Dashboard/Dashboard.styled';
import { DeleteDataForm } from 'components/Dashboard/QuestionsList/QuestionsForms/DeleteDataForm';
import { EditDataForm } from 'components/Dashboard/QuestionsList/QuestionsForms/EditDataForm';
import { isArray } from 'lodash';
import { useEffect, useState } from 'react';

import { NestedAccrodions } from './Accordions/NestedAccordions';
import { QuestionDetails } from './QuestionDetails';

export const QuestionsList = () => {
  const [data, setData] = useState<Question[]>([]);
  const [deletingId, setDeletingId] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question | []>([]);
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
    const response = await InterviewApi.getAll();
    if (response.status === 200) {
      const data: Question[] = await response.json();
      setData(data);
    }
  };

  return (
    <>
      <Container>
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
      </Container>
      <EditDataForm
        isOpen={isEditFormOpen}
        onClose={onEditFormClose}
        dataFetch={dataFetch}
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
          setDeletingId(isArray(editingQuestion) ? '' : editingQuestion._id);
          onDeleteFormOpen();
          onDetailsModalClose();
        }}
        onClose={onDetailsModalClose}
      />
    </>
  );
};
