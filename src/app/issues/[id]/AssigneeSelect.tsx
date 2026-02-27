"use client";

import Skeleton from "@/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Props {
	issue: Issue;
}

const AssigneeSelect = ({ issue }: Props) => {
	const { data: users, isLoading, error } = useUsers();

	if (isLoading) return <Skeleton />;

	if (error) return null;

	const assignIssue = async (userId: string) => {
		axios.patch(`/api/issues/${issue.id}`, { assignedUserId: userId === "unassigned" ? null : userId }).catch(() => {
			toast.error("Failed to update assignee. Please try again.");
		});
	};

	return (
		<>
			<Select.Root defaultValue={issue.assignedUserId || "unassigned"} onValueChange={assignIssue}>
				<Select.Trigger placeholder="Select assignee" />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item key="none" value="unassigned">
							Unassigned
						</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	);
};

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		retry: 3,
	});

export default AssigneeSelect;
