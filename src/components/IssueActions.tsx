import IssueFilter from "@/app/issues/IssueFilter";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
	return (
		<Flex justify="between">
			<IssueFilter />
			<Button>
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</Flex>
	);
};
export default IssueActions;
