export const MultiBox = ({
  value,
  color,
}: {
  value: number;
  color: string;
}) => {
  return (
    <div
      className={
        "text-md rounded w-min pl-1 pr-1" +
        (color === "green"
          ? " bg-green-400 text-zinc-800"
          : color === "grey"
            ? " bg-zinc-300 text-zinc-800"
            : "")
      }
    >
      {value}x
    </div>
  );
};