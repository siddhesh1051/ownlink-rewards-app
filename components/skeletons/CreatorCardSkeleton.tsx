import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { Skeleton, SkeletonText } from "../ui/skeleton";

export default function CreatorCardSkeleton() {
  return (
    <Box className="w-full flex flex-row items-center justify-between p-2 rounded-lgr">
      {/* Left section: Avatar and Name */}
      <HStack className="gap-4 items-center">
        <Skeleton variant="circular" className="h-[48px] w-[48px]" />
        <SkeletonText className="h-4 w-[150px]" />
      </HStack>

      {/* Right section: Icons */}
      <HStack className="gap-4 items-center">
        <Skeleton variant="sharp" className="h-[24px] w-[24px]" />
        <Skeleton variant="sharp" className="h-[24px] w-[24px]" />
      </HStack>
    </Box>
  );
}
