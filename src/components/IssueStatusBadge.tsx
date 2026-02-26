import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
	status: IssueStatus;
}

const IssueStatusBadge = ({ status }: Props) => {
	const statusMap: Record<IssueStatus, { label: string; color: "red" | "green" | "violet" }> = {
		OPEN: { label: "Open", color: "green" },
		IN_PROGRESS: { label: "In Progress", color: "violet" },
		CLOSED: { label: "Closed", color: "red" },
	};

	return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};
export default IssueStatusBadge;
