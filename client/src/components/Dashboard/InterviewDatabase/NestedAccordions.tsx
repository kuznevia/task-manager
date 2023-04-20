import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CloseButton,
  Flex,
  Link,
} from '@chakra-ui/react';
import { InterviewDatabaseResponse } from 'app/types';
import { groupBy } from 'lodash';

export const NestedAccrodions = ({
  data,
  groupKey,
  setDeletingId,
  onDeleteFormOpen,
}: {
  data: InterviewDatabaseResponse[];
  groupKey?: string;
  setDeletingId: React.Dispatch<React.SetStateAction<string>>;
  onDeleteFormOpen: () => void;
}) => {
  const groupedData = groupBy(data, groupKey);
  if (groupKey === 'subGroup') {
    return (
      <Accordion allowMultiple>
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
              <NestedAccrodions
                data={value}
                groupKey="group"
                setDeletingId={setDeletingId}
                onDeleteFormOpen={onDeleteFormOpen}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  if (groupKey === 'group') {
    return (
      <Accordion allowMultiple>
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
              <NestedAccrodions
                data={value}
                setDeletingId={setDeletingId}
                onDeleteFormOpen={onDeleteFormOpen}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Accordion allowMultiple>
      {data.map((value, index) => (
        <AccordionItem key={value.name}>
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
};
