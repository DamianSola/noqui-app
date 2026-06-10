import { getAvatarColor } from "@/helpers/business";

interface AvatarProps {
  seed: string;
  size?: "sm" | "md";
}

export function Avatar({ seed, size = "sm" }: AvatarProps) {
  const color = getAvatarColor(seed);
  const dim = size === "md" ? "w-9 h-9 text-sm" : "w-7 h-7 text-xs";

  return (
    <span
      className={`${dim} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
    >
      {seed.slice(-2).toUpperCase()}
    </span>
  );
}