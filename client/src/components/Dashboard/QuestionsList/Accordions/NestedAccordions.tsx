import { Button, Flex } from '@chakra-ui/react';
import { Question } from 'app/types';
import { groupBy } from 'lodash';

import { CustomAccordion } from './CustomAccordion';

export const NestedAccrodions = ({
  data,
  setDeletingId,
  onDeleteFormOpen,
  groupKey,
  setEditingQuestion,
  onDetailsModalOpen,
}: {
  data: Question[];
  setDeletingId: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFormOpen: () => void;
  setEditingQuestion: React.Dispatch<React.SetStateAction<Question | []>>;
  onDetailsModalOpen: () => void;
  groupKey?: string;
}) => {
  const groupedData = groupBy(data, groupKey);
  if (groupKey === 'group') {
    return (
      <CustomAccordion
        data={groupedData}
        groupKey="subGroup"
        setDeletingId={setDeletingId}
        onDeleteFormOpen={onDeleteFormOpen}
        setEditingQuestion={setEditingQuestion}
        onDetailsModalOpen={onDetailsModalOpen}
      />
    );
  }

  if (groupKey === 'subGroup') {
    return (
      <CustomAccordion
        data={groupedData}
        setDeletingId={setDeletingId}
        onDeleteFormOpen={onDeleteFormOpen}
        setEditingQuestion={setEditingQuestion}
        onDetailsModalOpen={onDetailsModalOpen}
      />
    );
  }

  return (
    <Flex direction="column" gap={3}>
      {data.map((question, index) => (
        <Button
          key={question.name}
          onClick={() => {
            setEditingQuestion(question);
            onDetailsModalOpen();
          }}
        >
          {`${index + 1} ${question.name}`}
        </Button>
      ))}
    </Flex>
  );
};
