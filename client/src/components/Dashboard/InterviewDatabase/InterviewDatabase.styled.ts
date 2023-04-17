import styled from '@emotion/styled';

export const DatabaseContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const QuestionsWrapper = styled.div``;
/*
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
*/
