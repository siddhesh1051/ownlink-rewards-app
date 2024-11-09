import React, { useRef, useState } from "react";
import {
  AnimatedProp,
  Canvas,
  Group,
  Image,
  Mask,
  Path,
  Rect,
  SkImage,
  Skia,
} from "@shopify/react-native-skia";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import { ScratchCard as ScratchCardModel } from "@/models";
import axios from "axios";
import { BACKEND_URL } from "@/utils/constants";
import Toast from "react-native-toast-message";

type Props = {
  style: StyleProp<ViewStyle>;
  image: AnimatedProp<SkImage | null>;
  children?: React.ReactNode;
  setIsModalOpen: (value: boolean) => void;
  scratchThreshold?: number; // Percentage of area that needs to be scratched (0-100)
  selectedScratchCard: ScratchCardModel | undefined;
  toggleRefresh: () => void;
  setRevealedPoints: any;
};

type Point = {
  x: number;
  y: number;
};

export const ScratchCard: React.FC<Props> = ({
  style,
  children,
  image,
  setIsModalOpen,
  scratchThreshold = 50,
  selectedScratchCard,
  toggleRefresh,
  setRevealedPoints,
}) => {
  const [[width, height], setSize] = useState([0, 0]);
  const [isScratched, setScratched] = useState(false);
  const [isMove, setMove] = useState(false);
  const path = useRef(Skia.Path.Make());
  const points = useRef<Point[]>([]);
  const gridSize = 20; // Size of each grid cell for coverage calculation
  const strokeWidth = 50;

  const calculateCoverage = () => {
    if (!width || !height) return 0;

    // Create a grid to track scratched areas
    const rows = Math.ceil(height / gridSize);
    const cols = Math.ceil(width / gridSize);
    const grid = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(false));

    // Mark grid cells as scratched based on stored points
    points.current.forEach((point) => {
      const radius = strokeWidth / 2;

      // Calculate grid cells affected by this point's radius
      const startRow = Math.max(0, Math.floor((point.y - radius) / gridSize));
      const endRow = Math.min(
        rows - 1,
        Math.floor((point.y + radius) / gridSize)
      );
      const startCol = Math.max(0, Math.floor((point.x - radius) / gridSize));
      const endCol = Math.min(
        cols - 1,
        Math.floor((point.x + radius) / gridSize)
      );

      // Mark cells as scratched
      for (let r = startRow; r <= endRow; r++) {
        for (let c = startCol; c <= endCol; c++) {
          grid[r][c] = true;
        }
      }
    });

    // Calculate percentage of grid cells that are scratched
    const totalCells = rows * cols;
    const scratchedCells = grid.flat().filter((cell) => cell).length;
    return (scratchedCells / totalCells) * 100;
  };

  const handleGetReward = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/openscratchcard`, {
        scratchCardId: selectedScratchCard?._id,
      });
      if (response.data && response.data.message) {
        setRevealedPoints(response.data.revealedPoints);
      }
    } catch (error) {
      console.error("Error getting scratchcards:", error);
    } finally {
      toggleRefresh();
    }
  };

  const handleOpenScratchCard = () => {
    setScratched(true);
    handleGetReward();
    handleCloseModalAfterDelay(1000);
  };

  const handleScratch = (x: number, y: number) => {
    points.current.push({ x, y });

    // Check coverage and trigger completion if threshold is met
    const coverage = calculateCoverage();
    if (coverage >= scratchThreshold && !isScratched) {
      handleOpenScratchCard();
    }
  };

  const handleCloseModalAfterDelay = (delay: number) => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, delay);
  };

  return (
    <View
      onLayout={(e) => {
        setSize([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
      }}
      style={[styles.container, style]}
    >
      {Boolean(image && width && height) && (
        <>
          {isMove && <View style={styles.content}>{children}</View>}
          <Canvas
            style={styles.canvas}
            onTouchStart={({ nativeEvent }) => {
              path.current.moveTo(nativeEvent.locationX, nativeEvent.locationY);
              handleScratch(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchMove={({ nativeEvent }) => {
              setMove(true);
              path.current.lineTo(nativeEvent.locationX, nativeEvent.locationY);
              handleScratch(nativeEvent.locationX, nativeEvent.locationY);
            }}
          >
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect x={0} y={0} width={1000} height={1000} color="white" />
                  <Path
                    path={path.current}
                    color="black"
                    style="stroke"
                    strokeJoin="round"
                    strokeCap="round"
                    strokeWidth={strokeWidth}
                  />
                </Group>
              }
            >
              {!isScratched && (
                <Image
                  image={image}
                  fit="cover"
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                />
              )}
            </Mask>
          </Canvas>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});
