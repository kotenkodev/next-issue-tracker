import { IssueStatusBadge, Link } from "@/components";
import { Issue, IssueStatus, User } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
	status: IssueStatus;
	orderBy: keyof Issue;
	page: string;
}

interface Props {
	searchParams: IssueQuery;
	issues: (Issue & { assignedUser: User | null })[];
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
						<Table.Cell className="hidden md:table-cell">
							{issue.assignedUser && (
								<Flex align="center" direction="row" gap="2">
									<Avatar
										size="2"
										radius="full"
										src={issue.assignedUser.image!}
										alt={issue.assignedUser.name || "User Avatar"}
										fallback={issue.assignedUser.name ? issue.assignedUser.name[0] : "U"}
									/>
									{issue.assignedUser?.name}
								</Flex>
							)}
							{!issue.assignedUser && "Unassigned"}
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export const columnsNames: {
	label: string;
	key: keyof Issue | "assignedUser";
	className?: string;
}[] = [
	{ label: "Issue", key: "title" },
	{ label: "Status", key: "status", className: "hidden md:table-cell" },
	{ label: "Created", key: "createdAt", className: "hidden md:table-cell" },
	{ label: "Assigned User", key: "assignedUser", className: "hidden md:table-cell" },
];

export default IssueTable;
