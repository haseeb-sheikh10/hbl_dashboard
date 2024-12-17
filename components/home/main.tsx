"use client";

import { HBL_DATA } from "@/constants/data";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const connections = [
  { name: "Bank Alfalah", value: 50000, color: "orange", strokeWidth: 3 },
  { name: "Meezan Bank", value: 700000, color: "gray", strokeWidth: 3 },
  { name: "Askari Bank", value: 4500, color: "blue", strokeWidth: 17 },
  { name: "Faysal Bank", value: 62000, color: "purple", strokeWidth: 5 },
  { name: "JS Bank", value: 55000, color: "brown", strokeWidth: 3 },
  { name: "Bank Islami", value: 80000, color: "green", strokeWidth: 27 },
  { name: "MCB", value: 67000, color: "pink", strokeWidth: 30 },
  { name: "United Bank", value: 520000, color: "skyblue", strokeWidth: 3 },
  { name: "Soneri", value: 7800, color: "yellow", strokeWidth: 40 },
  { name: "Bank of Punjab", value: 2300, color: "red", strokeWidth: 3 },
];

const MainComponent = () => {
  const mainCircleRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mainPosition, setMainPosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState<
    { x: number; y: number }[]
  >([]);

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [filterOn, setFilterOn] = useState<string>("");

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const updateInitialPositions = () => {
    if (!containerRef.current || !mainCircleRef.current) return;

    const containerRect = containerRef?.current?.getBoundingClientRect();
    const mainRect = mainCircleRef.current.getBoundingClientRect();
    const buttonRect = buttonRefs.current.map((ref) =>
      ref ? ref.getBoundingClientRect() : null
    );

    setMainPosition({
      x: mainRect.left - containerRect.left + mainRect.width / 2,
      y: mainRect.top - containerRect.top + mainRect.height / 2,
    });

    const buttonPositions = buttonRect.map((pos) =>
      pos
        ? {
            x: pos.left - containerRect.left + pos.width / 2,
            y: pos.top - containerRect.top + pos.height / 2,
          }
        : { x: 0, y: 0 }
    );

    setButtonPosition(buttonPositions);
  };

  useEffect(() => {
    updateInitialPositions();
    window.addEventListener("resize", updateInitialPositions);
    return () => window.removeEventListener("resize", updateInitialPositions);
  }, []);

  // Update position of a single button during drag
  const handleDrag = (index: number) => {
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const buttonRect = buttonRefs.current[index]?.getBoundingClientRect();
    if (!buttonRect || !containerRect) return;

    setButtonPosition((prev) => {
      const newPositions = [...prev];
      newPositions[index] = {
        x: buttonRect.left - containerRect.left + buttonRect.width / 2,
        y: buttonRect.top - containerRect.top + buttonRect.height / 2,
      };
      return newPositions;
    });
  };

  const handleSelection = (index: number, value: string) => {
    if (index === 0) {
      setSelectedRegion(value);
      setSelectedArea("");
      setSelectedBranch("");
      setFilterOn("region");
    } else if (index === 1) {
      setSelectedArea(value);
      setSelectedBranch("");
      setFilterOn("area");
    } else {
      setSelectedBranch(value);
      setFilterOn("branch");
    }
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      <div className="w-96 h-96 flex justify-center items-center relative">
        {/* <MovingBorderComponent> */}
        <BackgroundGradient
          className="rounded-full!"
          containerClassName="rounded-full!"
        >
          <motion.button
            ref={mainCircleRef}
            className="w-40 h-40 bg-neutral-800 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ scale: 0.9 }}
            drag
            onDrag={() => setShowFilters(false)}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onClick={() => {
              setSelectedRegion("");
              setSelectedArea("");
              setSelectedBranch("");
              setFilterOn("");
              setShowFilters((prev) => !prev);
            }}
          >
            <div>
              <h1 className="text-white drop-shadow font-semibold">
                Dr:{" "}
                <span className="text-green-500">
                  {filterOn === "region"
                    ? 10000
                    : filterOn === "area"
                    ? 5000
                    : filterOn === "branch"
                    ? 1000
                    : 500}
                </span>
              </h1>
              <h1 className="text-white drop-shadow font-semibold">
                Cr:{" "}
                <span className="text-red-500">
                  {filterOn === "region"
                    ? 5000
                    : filterOn === "area"
                    ? 4000
                    : filterOn === "branch"
                    ? 2000
                    : 1000}
                </span>
              </h1>
            </div>
          </motion.button>
        </BackgroundGradient>
        {/* </MovingBorderComponent> */}
        {showFilters && (
          <>
            <div className="absolute -right-[150px] top-0 z-50">
              <Select
                value={selectedRegion}
                onValueChange={(value) => handleSelection(0, value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(HBL_DATA).map((key, index) => (
                    <SelectItem key={index} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedRegion && (
              <div className="absolute -right-[200px] top-12 z-50">
                <Select
                  value={selectedArea}
                  onValueChange={(value) => handleSelection(1, value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRegion &&
                      Object.keys(HBL_DATA?.[selectedRegion]).map(
                        (key, index) => (
                          <SelectItem key={index} value={key}>
                            {key}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedRegion && selectedArea && (
              <div className="absolute -right-[250px] top-24 z-50">
                <Select
                  value={selectedBranch}
                  onValueChange={(value) => handleSelection(2, value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRegion &&
                      selectedArea &&
                      HBL_DATA?.[selectedRegion]?.[selectedArea]?.map(
                        (key: any, index: number) => (
                          <SelectItem key={index} value={key}>
                            {key}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}
      </div>

      {/* Connections via SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      >
        {buttonPosition?.map((pos, index) => {
          const startX = pos.x;
          const startY = pos.y;
          const endX = mainPosition.x;
          const endY = mainPosition.y;

          return (
            <path
              key={index}
              d={`M${startX},${startY} C${startX},${endY} ${endX},${startY} ${endX},${endY}`}
              stroke={connections[index].color}
              strokeWidth={connections[index]?.strokeWidth || 3}
              fill="none"
            />
          );
        })}
      </svg>

      <div className="grid grid-cols-10 gap-10">
        {connections?.map((node, key) => (
          <motion.button
            ref={(el) => {
              if (el) buttonRefs.current[key] = el;
            }}
            key={key}
            className="w-24 h-24 bg-neutral-800 relative z-10 rounded-full shadow-md"
            whileDrag={{ scale: 0.9 }}
            drag
            dragConstraints={containerRef}
            onDrag={() => handleDrag(key)}
            onDragEnd={() => handleDrag(key)}
          >
            <div>
              <h1 className="text-white drop-shadow font-semibold text-xs">
                {node.name}
              </h1>
              <h2>
                <span className="text-red-500">{node.value}</span>
              </h2>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
