import { Button, Heading } from '@chakra-ui/react';
import { NestedAccrodions } from 'widgets/DashboardWidgets/Questions/ui/Accordions/NestedAccordions';
import { useModal } from 'widgets/DashboardWidgets/Questions/ui/hooks/useModal';
import { useQuestions } from 'widgets/DashboardWidgets/Questions/ui/hooks/useQuestions';
import { QuestionsModal } from 'widgets/DashboardWidgets/Questions/ui/QuestionsModals/QuestionsModal';

import * as S from './Questions.styled';

export const Questions = () => {
  const {
    data,
    deletingId,
    editingQuestion,
    setDeletingId,
    setEditingQuestion,
    dataFetch,
  } = useQuestions();

  const { disclousureProps } = useModal();

  return (
    <>
      <S.Questions>
        <Heading>Interview Questions Database</Heading>
        <NestedAccrodions
          data={data}
          groupKey="group"
          setDeletingId={setDeletingId}
          onDeleteFormOpen={disclousureProps.onDeleteFormOpen}
          setEditingQuestion={setEditingQuestion}
          onDetailsModalOpen={disclousureProps.onDetailsModalOpen}
        />
        <Button onClick={disclousureProps.onEditFormOpen}>Add data</Button>
      </S.Questions>
      <QuestionsModal
        disclousureProps={disclousureProps}
        questionsProps={{
          deletingId,
          editingQuestion,
          dataFetch,
          setEditingQuestion,
          setDeletingId,
        }}
      />
    </>
  );
};
