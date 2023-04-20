import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import InterviewApi from 'app/api/interviewApiSlice';
import { InterviewDatabaseResponse } from 'app/types';
import { Container } from 'components/Dashboard/Dashboard.styled';
import { DeleteDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/DeleteDataForm';
import { EditDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/EditDataForm';
import { useEffect, useState } from 'react';

import { NestedAccrodions } from './NestedAccordions';

export const InterviewDatabase = () => {
  const [data, setData] = useState<InterviewDatabaseResponse[]>([]);
  const [deletingId, setDeletingId] = useState('');
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

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    const response = await InterviewApi.getAll();
    if (response.status === 200) {
      const data: InterviewDatabaseResponse[] = await response.json();
      setData(data);
    }
  };

  return (
    <>
      <Container>
        <Heading>Interview Database</Heading>
        <NestedAccrodions
          data={data}
          groupKey="subGroup"
          setDeletingId={setDeletingId}
          onDeleteFormOpen={onDeleteFormOpen}
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
    </>
  );
};
