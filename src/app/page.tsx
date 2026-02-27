import { prisma } from '@/../prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const total = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...total} />
        <IssueChart {...total} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View the latest issues and their statuses in the Issue Tracker dashboard.',
  keywords: [
    'issue tracker',
    'dashboard',
    'project management',
    'bug tracking',
    'task management',
    'status',
    'latest issues',
  ],
  openGraph: {
    title: 'Issue Tracker Dashboard',
    description: 'Track and manage issues efficiently with our dashboard.',
    siteName: 'Issue Tracker',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Issue Tracker Dashboard',
    description: 'Track and manage issues efficiently with our dashboard.',
  },
};
