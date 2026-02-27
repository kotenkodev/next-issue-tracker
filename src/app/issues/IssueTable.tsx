import { IssueStatusBadge, Link } from "@/components";
import { Issue, IssueStatus } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
	status: IssueStatus;
	orderBy: keyof Issue;
	page: string;
}

interface Props {
	searchParams: IssueQuery;
	issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					{columnsNames.map((column) => (
						<Table.ColumnHeaderCell key={column.key} className={column.className}>
							<NextLink href={{ query: { ...searchParams, orderBy: column.key } }}>{column.label}</NextLink>
							{column.key === searchParams.orderBy && <ArrowUpIcon className="inline" />}
						</Table.ColumnHeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{issues.map((issue) => (
					<Table.Row key={issue.id}>
						<Table.Cell>
							<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
							<div className="block md:hidden">
								<IssueStatusBadge status={issue.status} />
							</div>
						</Table.Cell>
						<Table.Cell className="hidden md:table-cell">
							<IssueStatusBadge status={issue.status} />
						</Table.Cell>
						<Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export const columnsNames: {
	label: string;
	key: keyof Issue;
	className?: string;
}[] = [
	{ label: "Issue", key: "title" },
	{ label: "Status", key: "status", className: "hidden md:table-cell" },
	{ label: "Created", key: "createdAt", className: "hidden md:table-cell" },
];

export default IssueTable;
