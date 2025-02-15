import { BonusItem } from "./BonusItem";

export const BonusList = () => {
  return (
    <div>
      <h2 className="mb-2 text-md">Bonus récupérés :</h2>
      <div className="flex flex-col gap-3">
        <BonusItem />
        <BonusItem />
      </div>
    </div>
  );
};