import { prisma } from '@/../prisma/client';
import EditIssueWrapper from './EditIssueWrapper';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return <EditIssueWrapper issue={issue} />;
};
export default EditIssuePage;
