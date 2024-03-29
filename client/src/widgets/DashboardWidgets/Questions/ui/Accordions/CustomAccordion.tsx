import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { Dictionary } from 'lodash';
import React from 'react';
import { Question } from 'widgets/DashboardWidgets/Questions/model/questionsTypes';

import { NestedAccrodions } from './NestedAccordions';

export const CustomAccordion = ({
  data,
  setDeletingId,
  onDeleteFormOpen,
  setEditingQuestion,
  onDetailsModalOpen,
  groupKey,
}: {
  data: Dictionary<Question[]>;
  setDeletingId: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFormOpen: () => void;
  setEditingQuestion: React.Dispatch<React.SetStateAction<Question | undefined>>;
  onDetailsModalOpen: () => void;
  groupKey?: string;
}) => {
  return (
    <Accordion allowMultiple padding={groupKey ? 50 : 0} width="100%">
      {Object.entries(data).map(([key, value], index) => (
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
            <NestedAccrodions
              data={value}
              groupKey={groupKey}
              setDeletingId={setDeletingId}
              onDeleteFormOpen={onDeleteFormOpen}
              setEditingQuestion={setEditingQuestion}
              onDetailsModalOpen={onDetailsModalOpen}
            />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
