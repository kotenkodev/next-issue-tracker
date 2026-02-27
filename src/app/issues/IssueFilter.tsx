'use client';
import { IssueStatus } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: IssueStatus }[] = [
  { label: 'All' },
  { label: 'Open', value: IssueStatus.OPEN },
  { label: 'Closed', value: IssueStatus.CLOSED },
  { label: 'In Progress', value: IssueStatus.IN_PROGRESS },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'all'}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== 'all') params.set('status', status);
        const orderBy = searchParams.get('orderBy');
        if (orderBy) params.set('orderBy', orderBy);
        router.push(`/issues?${params.toString()}`);
      }}
    >
      <Select.Trigger placeholder="Filter issues" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Filter by status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value ?? 'all'}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default IssueFilter;
