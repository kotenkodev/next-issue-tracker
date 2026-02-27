"use client";
import { IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: IssueStatus }[] = [
	{ label: "All" },
	{ label: "Open", value: IssueStatus.OPEN },
	{ label: "Closed", value: IssueStatus.CLOSED },
	{ label: "In Progress", value: IssueStatus.IN_PROGRESS },
];

const IssueFilter = () => {
	const router = useRouter();
	return (
		<Select.Root
			onValueChange={(status) => {
				const query = status !== "all" ? "?status=" + status : "";
				router.push(`/issues${query}`);
			}}
		>
			<Select.Trigger placeholder="Filter issues" />
			<Select.Content>
				<Select.Group>
					<Select.Label>Filter by status</Select.Label>
					{statuses.map((status) => (
						<Select.Item key={status.label} value={status.value ?? "all"}>
							{status.label}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};
export default IssueFilter;
