import { Skeleton } from '@/components';
import { Box, Card, Flex } from '@radix-ui/themes';

const LoadingIssuesDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex my={'2'} gap={'3'}>
        <Skeleton width="5rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={6} />
      </Card>
    </Box>
  );
};
export default LoadingIssuesDetailsPage;
