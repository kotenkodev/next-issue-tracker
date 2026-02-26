import { prisma } from "@/../prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
	params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
	const { id } = await params;
	const issue = await prisma.issue.findUnique({
		where: { id },
	});

	if (!issue) notFound();

	return (
		<Grid gap="5" columns={{ initial: "1", md: "2" }}>
			<Box>
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issueId={issue.id} />
			</Box>
		</Grid>
	);
};
export default IssueDetailPage;
