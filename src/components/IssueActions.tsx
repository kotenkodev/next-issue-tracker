import IssueFilter from '@/app/issues/IssueFilter';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { Suspense } from 'react';
import Skeleton from './Skeleton';

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Suspense fallback={<Skeleton />}>
        <IssueFilter />
      </Suspense>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};
export default IssueActions;
