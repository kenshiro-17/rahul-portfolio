"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, ZONES } from "@/lib/gameStore";
import { PERSONAL_INFO } from "@/lib/constants";

// Minimap component
function Minimap() {
  const { player, currentZone, visitedZones, showMinimap } = useGameStore();

  if (!showMinimap) return null;

  // Scale factor for minimap
  const scale = 3;
  const mapSize = 180;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className="relative rounded-full overflow-hidden border-2 border-purple-500/50"
        style={{
          width: mapSize,
          height: mapSize,
          background: "radial-gradient(circle, #1e1b4b 0%, #020617 100%)",
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
        }}
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Zone markers */}
        {ZONES.map((zone) => {
          const x = mapSize / 2 + zone.position[0] * scale;
          const y = mapSize / 2 - zone.position[2] * scale;
          const isVisited = visitedZones.has(zone.id);
          const isCurrent = currentZone === zone.id;

          return (
            <div
              key={zone.id}
              className="absolute transition-all duration-300"
              style={{
                left: x - 6,
                top: y - 6,
                width: 12,
                height: 12,
              }}
            >
              <div
                className={`w-full h-full rounded-full ${
                  isCurrent ? "animate-pulse" : ""
                }`}
                style={{
                  background: zone.color,
                  opacity: isVisited ? 1 : 0.4,
                  boxShadow: isCurrent ? `0 0 10px ${zone.color}` : "none",
                }}
              />
            </div>
          );
        })}

        {/* Player marker */}
        <div
          className="absolute w-3 h-3 transition-all duration-100"
          style={{
            left: mapSize / 2 + player.position[0] * scale - 6,
            top: mapSize / 2 - player.position[2] * scale - 6,
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg" />
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
        </div>

        {/* Cardinal directions */}
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-purple-400 font-bold">
          N
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-purple-400 font-bold">
          S
        </span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-purple-400 font-bold">
          W
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-purple-400 font-bold">
          E
        </span>
      </div>

      {/* Zone name */}
      <div className="mt-2 text-center">
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            background: ZONES.find((z) => z.id === currentZone)?.color + "30",
            color: ZONES.find((z) => z.id === currentZone)?.color,
          }}
        >
          {ZONES.find((z) => z.id === currentZone)?.name}
        </span>
      </div>
    </div>
  );
}

// Crosshair
function Crosshair() {
  const { isStarted, isPaused } = useGameStore();

  if (!isStarted || isPaused) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
      <div className="relative">
        {/* Center dot */}
        <div className="w-1 h-1 bg-white rounded-full" />
        {/* Cross lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-0.5 bg-white/50 -translate-x-6" />
          <div className="w-4 h-0.5 bg-white/50 translate-x-2" />
          <div className="w-0.5 h-4 bg-white/50 -translate-y-6" style={{ marginLeft: "-1px" }} />
          <div className="w-0.5 h-4 bg-white/50 translate-y-2" style={{ marginLeft: "-1px" }} />
        </div>
      </div>
    </div>
  );
}

// Interaction prompt
function InteractionPrompt() {
  const { nearbyInteractable, isStarted, isPaused } = useGameStore();

  if (!isStarted || isPaused || !nearbyInteractable) return null;

  const zone = ZONES.find((z) => z.id === nearbyInteractable);
  if (!zone) return null;

  return (
    <motion.div
      className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div
        className="px-6 py-3 rounded-xl backdrop-blur-xl border"
        style={{
          background: `${zone.color}20`,
          borderColor: `${zone.color}50`,
        }}
      >
        <div className="text-center">
          <p className="text-white font-medium">{zone.name}</p>
          <p className="text-sm" style={{ color: zone.color }}>
            {zone.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Progress/collectibles tracker
function CollectiblesTracker() {
  const { collectedItems, visitedZones, showHUD } = useGameStore();

  if (!showHUD) return null;

  const totalCollectibles = 6;
  const totalZones = ZONES.length;

  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="space-y-2">
        {/* Zones visited */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-900/80 backdrop-blur-sm border border-purple-500/20">
          <span className="text-purple-400 text-sm">Zones</span>
          <div className="flex gap-1">
            {ZONES.map((zone) => (
              <div
                key={zone.id}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  background: visitedZones.has(zone.id) ? zone.color : "#333",
                }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {visitedZones.size}/{totalZones}
          </span>
        </div>

        {/* Collectibles */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-900/80 backdrop-blur-sm border border-yellow-500/20">
          <span className="text-yellow-400 text-sm">Items</span>
          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${(collectedItems.size / totalCollectibles) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {collectedItems.size}/{totalCollectibles}
          </span>
        </div>
      </div>
    </div>
  );
}

// Controls hint
function ControlsHint() {
  const { isStarted, isPaused } = useGameStore();
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (isStarted && !isPaused) {
      const timer = setTimeout(() => setShowHint(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isStarted, isPaused]);

  if (!isStarted || isPaused || !showHint) return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="px-4 py-3 rounded-xl bg-void-900/80 backdrop-blur-sm border border-purple-500/20">
        <p className="text-xs text-gray-400 mb-2">CONTROLS</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <span className="text-purple-400">WASD</span>
          <span className="text-gray-300">Move</span>
          <span className="text-purple-400">Mouse</span>
          <span className="text-gray-300">Look</span>
          <span className="text-purple-400">Space</span>
          <span className="text-gray-300">Jump</span>
          <span className="text-purple-400">Shift</span>
          <span className="text-gray-300">Sprint</span>
          <span className="text-purple-400">ESC</span>
          <span className="text-gray-300">Pause</span>
        </div>
      </div>
    </motion.div>
  );
}

// Main HUD component
export default function GameHUD() {
  const { isStarted, isPaused, showHUD } = useGameStore();

  if (!isStarted) return null;

  return (
    <AnimatePresence>
      {showHUD && (
        <>
          <Crosshair />
          <Minimap />
          <InteractionPrompt />
          <CollectiblesTracker />
          <ControlsHint />

          {/* Pause indicator */}
          {isPaused && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">PAUSED</h2>
                <p className="text-gray-400">Click to resume</p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
