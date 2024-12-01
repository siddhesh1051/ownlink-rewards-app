import { Box } from "../ui/box";
import { Skeleton } from "../ui/skeleton";

export default function ScratchCardSkeleton() {
  return (
    <Box className="w-full">
      <Skeleton
        variant="sharp"
        className="w-full h-[150px] rounded-lg bg-background-100"
      />
    </Box>
  );
}
