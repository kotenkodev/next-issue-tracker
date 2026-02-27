'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => (
  <Suspense fallback={<IssueFormSkeleton />}>
    <IssueForm />
  </Suspense>
);

export default NewIssuePage;
