import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadingCard = () => {
  return (
    <div className="mb-3 ">
      <Box padding="6" boxShadow="md" bg="white" rounded="md">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    </div>
  );
};

export default LoadingCard;
