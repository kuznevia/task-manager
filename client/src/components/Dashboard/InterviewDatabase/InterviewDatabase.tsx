import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import InterviewApi from 'api/interviewApiSlice';
import { DeleteDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/DeleteDataForm';
import { EditDataForm } from 'components/Dashboard/InterviewDatabase/InterviewDataForms/EditDataForm';
import { groupBy } from 'lodash';
import { useEffect, useState } from 'react';

import { DatabaseContainer, QuestionsWrapper } from './InterviewDatabase.styled';

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

  const getNestedAccrodions = (data: InterviewDatabaseResponse[], key?: string) => {
    const groupedData = groupBy(data, key);
    if (key === 'subGroup') {
      return (
        <Accordion defaultIndex={[0]} allowMultiple>
          {Object.entries(groupedData).map(([key, value], index) => (
            <AccordionItem key={key}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {index + 1 + ' ' + key}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {getNestedAccrodions(value, 'group')}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    if (key === 'group') {
      return (
        <Accordion defaultIndex={[0]} allowMultiple>
          {data.map((value, index) => (
            <AccordionItem key={key}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {index + 1 + ' ' + value.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex>
                  {value.description || (
                    <Link href={value.link} isExternal alignItems="center">
                      <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  <CloseButton
                    onClick={() => {
                      setDeletingId(value._id);
                      onDeleteFormOpen();
                    }}
                  />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    return (
      <Accordion defaultIndex={[0]} allowMultiple>
        {Object.entries(groupedData).map(([key, value], index) => (
          <AccordionItem key={key}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {index + 1 + ' ' + key}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{getNestedAccrodions(value)}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return (
    <>
      <DatabaseContainer>
        <Heading>Interview Database</Heading>
        <QuestionsWrapper>{getNestedAccrodions(data, 'subGroup')}</QuestionsWrapper>
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
