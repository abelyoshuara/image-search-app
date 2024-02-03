import { Box } from "@radix-ui/themes";
import { FC } from "react";

const SkeletonLoading: FC = () => {
  return (
    <Box
      style={{
        height: "140px",
        borderRadius: "8px",
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        border: "1px solid var(--gray-7)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.5s infinite",
      }}
    ></Box>
  );
};

export default SkeletonLoading;
