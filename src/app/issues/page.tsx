import { prisma } from "@/../prisma/client";
import { IssueActions } from "@/components";
import Pagination from "@/components/Pagination";
import { IssueStatus } from "@prisma/client";
import IssueTable, { columnsNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

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
export default IssuesPage;
