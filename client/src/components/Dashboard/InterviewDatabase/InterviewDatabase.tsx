import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import InterviewApi from 'api/interviewApiSlice';
import { DeleteDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/DeleteDataForm';
import { EditDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/EditDataForm';
import { useEffect, useState } from 'react';

import { DatabaseContainer, QuestionsWrapper } from './InterviewDatabase.styled';
import { NestedAccrodions } from './NestedAccordions';

export type InterviewDatabaseResponse = {
  _id: string;
  name: string;
  group: string;
  subGroup: string;
  link?: string;
  description?: string;
};

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
      <DatabaseContainer>
        <Heading>Interview Database</Heading>
        <QuestionsWrapper>
          <NestedAccrodions
            data={data}
            groupKey="subGroup"
            setDeletingId={setDeletingId}
            onDeleteFormOpen={onDeleteFormOpen}
          />
        </QuestionsWrapper>
        <Button onClick={onEditFormOpen}>Add data</Button>
      </DatabaseContainer>
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
