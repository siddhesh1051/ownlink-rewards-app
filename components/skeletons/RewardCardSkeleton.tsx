import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Skeleton, SkeletonText } from "../ui/skeleton";
import { VStack } from "../ui/vstack";

export default function RewardCardSkeleton() {
  return (
    <Box className="w-full p-4 bg-background-100 rounded-lg shadow-lg">
      {/* Image Skeleton */}
      <Skeleton variant="sharp" className="w-full h-[250px] rounded-lg mb-4" />

      {/* Reward Category */}
      <SkeletonText className="w-1/3 h-4 mb-2" />

      {/* Reward Title and Points */}
      <VStack space="sm" className="mb-6">
        <SkeletonText className="w-2/3 h-6" />
        <HStack space="sm" className="items-center">
          <SkeletonText className="w-1/4 h-6" />
          <Skeleton variant="circular" className="h-6 w-6" />
        </HStack>
      </VStack>

      {/* Redeem Button */}
      <Skeleton variant="sharp" className="w-full h-10 rounded-lg" />
    </Box>
  );
}
