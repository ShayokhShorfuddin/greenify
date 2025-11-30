import { CopyToClipboardButton } from "@/shared/CopyToClipboardButton";

export function ScoreCard() {
  return (
    <div className="relative bg-greenify-card-background border border-greenify-card-border rounded-lg p-3 max-w-fit">
      {/* Score number */}
      <small className="text-neutral-700 font-mono">Score #2</small>
      <p className="text-[15px]">Greenify Score.</p>

      <CopyToClipboardButton
        text="Greenify Score: 87%"
        className="absolute top-2 right-2"
      />

      <div className="relative flex items-center justify-center size-32 rounded-full mt-4 m-2 border-3 border-green-500">
        <p className="text-3xl font-medium font-mono">87%</p>
      </div>
    </div>
  );
}
