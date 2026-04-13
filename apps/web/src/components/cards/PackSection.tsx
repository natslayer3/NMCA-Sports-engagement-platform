import { Card, Button } from "@heroui/react";

interface PackSectionProps {
  packsRemaining: number;
  isOpening: boolean;
  onOpenPack: () => void;
}

export default function PackSection({ packsRemaining, isOpening, onOpenPack }: PackSectionProps) {
  return (
    <div className="bg-gradient-to-b from-[#0f1b2d] to-[#1a2d47] rounded-2xl p-8 mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold">Digital Card Packs</h2>
          <p className="text-gray-400 text-sm mt-1">
            Open packs to unlock new player cards and expand your collection
          </p>
        </div>
        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
          {packsRemaining} Packs Left
        </span>
      </div>

      <Card className="bg-[#1a2d47] border border-gray-600">
        <Card.Content className="flex flex-row items-center gap-8 p-6">
          {/* Pack visual */}
          <div className="w-36 h-48 rounded-xl bg-gradient-to-b from-[#4B90CD] to-[#0f1b2d] border-2 border-[#4B90CD]/50 flex flex-col items-center justify-center shrink-0">
            <span className="text-white font-black text-lg">TITAN</span>
            <span className="text-[#4B90CD] font-bold text-sm">PACK</span>
          </div>

          {/* Pack contents */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-3">Pack Contents</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                3 Guaranteed Common Cards
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                1 Rare or Elite Card
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Chance for Titan Rarity
              </li>
            </ul>
          </div>

          {/* Open button */}
          <div className="shrink-0">
            <Button
              size="lg"
              className="bg-white text-[#0f1b2d] font-bold px-10 hover:bg-gray-100"
              onPress={onOpenPack}
              isDisabled={packsRemaining <= 0 || isOpening}
            >
              {isOpening ? "Opening…" : "Open Pack"}
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
