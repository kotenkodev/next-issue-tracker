import { Skeleton } from "@/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
	return (
		<Box className="max-w-xl">
			<Skeleton height="2rem" />
			<Flex my={"2"} gap={"3"}>
				<Skeleton height="2rem" width="5rem" />
			</Flex>
			<Card className="prose" mt="4">
				<Skeleton count={6} />
			</Card>
		</Box>
	);
};
export default IssueFormSkeleton;
