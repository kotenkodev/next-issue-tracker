import { IssueStatus } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = async ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status?: IssueStatus }[] = [
    { label: 'Open Issues', value: open, status: IssueStatus.OPEN },
    { label: 'In Progress Issues', value: inProgress, status: IssueStatus.IN_PROGRESS },
    { label: 'Closed Issues', value: closed, status: IssueStatus.CLOSED },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/issues?status=${container.status}`}>
              <div>{container.label}</div>
            </Link>
            <Text className="font-bold"> {container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};
export default IssueSummary;
