import { prisma } from "@/../prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
	params: { id: string };
}

const fetchUser = cache((issueId: string) =>
	prisma.issue.findUnique({
		where: { id: issueId },
	}),
);

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);
	const { id } = await params;
	const issue = await fetchUser(id);

	if (!issue) notFound();

	return (
		<Grid gap="5" columns={{ initial: "1", sm: "5" }}>
			<Box className="md:col-span-4 ">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Flex direction="column" gap="4">
					<AssigneeSelect issue={issue} />
					<EditIssueButton issueId={issue.id} />
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: Props) {
	const { id } = await params;
	const issue = await fetchUser(id);

	if (!issue) return {};
	return {
		title: `Issue Tracker - ${issue.title}`,
		description: `Details for issue "${issue.title}" in the Issue Tracker.`,
	};
}

export default IssueDetailPage;
