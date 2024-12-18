"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import FilterBar from "./filter-bar";
import { cn } from "@/lib/utils";

type Bank = {
  name: string;
  debit: number | string;
  credit: number | string;
};

const MainComponent = () => {
  const mainCircleRef = useRef<HTMLButtonElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mainPosition, setMainPosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState<
    { x: number; y: number }[]
  >([]);

  const [showFilter, setShowFilter] = useState<string>("all");
  const [selectedMode, setSelectedMode] = useState<string>("volume");

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [filterOn, setFilterOn] = useState<string>("");

  const [connections, setConnections] = useState<Bank[]>([
    {
      name: "Bank 1",
      debit: 10000,
      credit: 5000,
    },
    {
      name: "Bank 2",
      debit: 5000,
      credit: 4000,
    },
    {
      name: "Bank 3",
      debit: 1000,
      credit: 2000,
    },
    {
      name: "Bank 4",
      debit: 10000,
      credit: 10000,
    },
    {
      name: "Bank 5",
      debit: 5000,
      credit: 5000,
    },
  ]);

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
  }, [connections]);

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
      setFilterOn("region");
    } else if (index === 1) {
      setSelectedArea(value);
      setFilterOn("area");
    } else if (index === 2) {
      setSelectedBranch(value);
      setFilterOn("branch");
    } else if (index === 3) {
      setSelectedCustomer(value);
      setFilterOn("customer");
    } else if (index === 4) {
      setSelectedAccount(value);
      setFilterOn("account");
    }
  };

  const handleShowToggle = () => {
    setShowFilter((prev) =>
      prev === "all" ? "debit" : prev === "debit" ? "credit" : "all"
    );
  };

  return (
    <>
      <FilterBar
        selectedRegion={selectedRegion}
        selectedArea={selectedArea}
        selectedBranch={selectedBranch}
        selectedCustomer={selectedCustomer}
        selectedAccount={selectedAccount}
        handleSelection={handleSelection}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        setConnections={setConnections}
      />
      <div
        ref={containerRef}
        className="relative flex flex-col items-center flex-1 h-full"
      >
        <div className="w-96 h-96 flex justify-center items-center relative">
          {/* <MovingBorderComponent> */}
          <BackgroundGradient
            className="rounded-full!"
            containerClassName="rounded-full!"
          >
            <motion.button
              ref={mainCircleRef}
              className={cn("w-44 h-44 bg-neutral-800 rounded-full")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              whileDrag={{ scale: 0.9 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onClick={handleShowToggle}
            >
              <div>
                {(showFilter === "all" || showFilter === "debit") && (
                  <h1 className="text-white drop-shadow font-semibold">
                    Dr:{" "}
                    {selectedMode === "volume" && (
                      <span className="text-green-500">
                        {filterOn === "region"
                          ? 10000
                          : filterOn === "area"
                          ? 5000
                          : filterOn === "branch"
                          ? 1000
                          : filterOn === "customer"
                          ? 10000
                          : filterOn === "account"
                          ? 5000
                          : 500}
                      </span>
                    )}
                    {selectedMode === "count" && (
                      <span className="text-green-500">
                        {filterOn === "region"
                          ? 4
                          : filterOn === "area"
                          ? 3
                          : filterOn === "branch"
                          ? 2
                          : filterOn === "customer"
                          ? 10
                          : filterOn === "account"
                          ? 7
                          : 5}
                      </span>
                    )}
                  </h1>
                )}
                {(showFilter === "all" || showFilter === "credit") && (
                  <h1 className="text-white drop-shadow font-semibold">
                    Cr:{" "}
                    {selectedMode === "volume" && (
                      <span className="text-red-500">
                        {filterOn === "region"
                          ? 5000
                          : filterOn === "area"
                          ? 4000
                          : filterOn === "branch"
                          ? 2000
                          : filterOn === "customer"
                          ? 10000
                          : filterOn === "account"
                          ? 5000
                          : 1000}
                      </span>
                    )}
                    {selectedMode === "count" && (
                      <span className="text-red-500">
                        {filterOn === "region"
                          ? 3
                          : filterOn === "area"
                          ? 4
                          : filterOn === "branch"
                          ? 2
                          : filterOn === "customer"
                          ? 10
                          : filterOn === "account"
                          ? 7
                          : 3}
                      </span>
                    )}
                  </h1>
                )}
              </div>
            </motion.button>
          </BackgroundGradient>
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

            const offset = 15;

            const isDebitGreater =
              connections[index].debit > connections[index].credit;

            return (
              <>
                {(showFilter === "all" || showFilter === "debit") && (
                  <path
                    key={`line1-${index}`}
                    d={`M${startX},${startY} C${startX},${endY} ${endX},${startY} ${endX},${endY}`}
                    stroke={"#197059"}
                    strokeWidth={isDebitGreater ? "16" : "5"}
                    fill="none"
                    markerEnd="url(#arrow-end)" // Add arrow at the end
                  />
                )}

                {(showFilter === "all" || showFilter === "credit") && (
                  <path
                    key={`line2-${index}`}
                    d={`M${startX + offset},${startY + offset} C${
                      startX + offset
                    },${endY + offset} ${endX + offset},${startY + offset} ${
                      endX + offset
                    },${endY + offset}`}
                    stroke={"#ef4444"}
                    strokeWidth={isDebitGreater ? "5" : "16"}
                    fill="none"
                    markerStart="url(#arrow-start)" // Add arrow at the start
                  />
                )}
              </>
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
              className="w-28 h-28 bg-neutral-800 relative z-10 rounded-full shadow-md"
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
                <div className="text-xs mt-1">
                  {(showFilter === "all" || showFilter === "debit") && (
                    <h1 className="text-white drop-shadow font-semibold">
                      Dr:{" "}
                      {selectedMode === "volume" && (
                        <span className="text-green-500">
                          {connections[key].debit}
                        </span>
                      )}
                      {selectedMode === "count" && (
                        <span className="text-green-500">{5}</span>
                      )}
                    </h1>
                  )}
                  {(showFilter === "all" || showFilter === "credit") && (
                    <h1 className="text-white drop-shadow font-semibold">
                      Cr:{" "}
                      {selectedMode === "volume" && (
                        <span className="text-red-500">
                          {connections[key].credit}
                        </span>
                      )}
                      {selectedMode === "count" && (
                        <span className="text-red-500">{3}</span>
                      )}
                    </h1>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
