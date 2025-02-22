import { BonusItem } from './BonusItem';
import type { BonusAndGameWithImageAndCasino } from './BonusItem';

export type BonusList = Array<BonusAndGameWithImageAndCasino>;

export const BonusList = ({bonusList
}: {bonusList: BonusList}) => {
    return (
        <div>
            <h2 className="mb-2 text-md">Bonus récupérés :</h2>
            <div className="flex flex-col gap-3">
                {bonusList.map((bonus) => {
                    return(
                        <BonusItem bonus={bonus} key={bonus.id}/>
                    )
                })}
            </div>
        </div>
    );
};
