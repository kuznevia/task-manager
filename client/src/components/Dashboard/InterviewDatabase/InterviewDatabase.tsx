import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import InterviewApi from 'api/interviewApiSlice';
import { Container } from 'components/Authorization/Authorization.styled';
import { EditDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/EditDataForm';
import { useEffect, useState } from 'react';

import { DeleteDataForm } from './InterviewDataForms/DeleteDataForm';

type InterviewDatabaseResponse = {
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
      <Container>
        <Heading>Interview Database</Heading>
        {data.map((data) => (
          <Flex key={data._id} gap="10px" align="center">
            <a href={`#${data.group}`}>
              <p id={data.group}>{data.group}</p>
            </a>
            <p>{data.subGroup}</p>
            <p>{data.name}</p>
            {data.link && (
              <Link href={data.link} isExternal alignItems="center">
                <ExternalLinkIcon mx="2px" />
              </Link>
            )}
            {data.description && <p>{data.description}</p>}
            <CloseButton
              onClick={() => {
                setDeletingId(data._id);
                onDeleteFormOpen();
              }}
            />
          </Flex>
        ))}
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
