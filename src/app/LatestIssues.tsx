import { prisma } from '@/../prisma/client';
import { IssueStatusBadge } from '@/components';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

const LatestIssues = async () => {
  noStore();

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedUser: true },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex gap="2" align="start" direction="column">
                    <NextLink href={`/issues/${issue.id}`}>{issue.title}</NextLink>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedUser && (
                    <Avatar
                      size="2"
                      radius="full"
                      src={issue.assignedUser.image!}
                      alt={issue.assignedUser.name || 'User Avatar'}
                      fallback={issue.assignedUser.name ? issue.assignedUser.name[0] : 'U'}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
