import { prisma } from "@/../prisma/client";
import { IssueActions } from "@/components";
import Pagination from "@/components/Pagination";
import { IssueStatus } from "@prisma/client";
import IssueTable, { columnsNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
	searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const queryFilter = await searchParams;

	const statuses = Object.values(IssueStatus);
	const filteredStatus = statuses.includes(queryFilter.status) ? queryFilter.status : undefined;

	const orderBy = columnsNames.map((column) => column.key).includes(queryFilter.orderBy)
		? { [queryFilter.orderBy]: "desc" }
		: undefined;

	const where = filteredStatus ? { status: filteredStatus } : {};

	const page = parseInt(queryFilter.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
		include: { assignedUser: true },
	});

	const itemCount = await prisma.issue.count({
		where,
	});

	return (
		<Flex direction="column" gap="3">
			<IssueActions />
			<IssueTable searchParams={queryFilter} issues={issues} />
			<Flex align="center" justify="center">
				<Pagination itemCount={itemCount} itemsPerPage={pageSize} currentPage={page} />
			</Flex>
		</Flex>
	);
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Issue Tracker - Issue List",
	description:
		"Browse and manage all issues in the Issue Tracker. Filter by status, sort by different criteria, and view details of each issue.",
	keywords: [
		"issue tracker",
		"issue list",
		"project management",
		"bug tracking",
		"task management",
		"filter",
		"sort",
		"details",
	],
	openGraph: {
		title: "Issue Tracker - Issue List",
		description: "Browse and manage all issues in the Issue Tracker.",
		siteName: "Issue Tracker",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Issue Tracker - Issue List",
		description: "Browse and manage all issues in the Issue Tracker.",
	},
};

export default IssuesPage;
