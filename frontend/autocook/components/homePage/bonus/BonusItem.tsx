import { MultiBox } from '../MultiBox';
import { Button } from '@nextui-org/button';
import { Prisma } from '@prisma/client';
import ImageDisplay from '@/components/ImageDisplay';

export type BonusAndGameWithImageAndCasino = Prisma.BonusGetPayload<{
    include: { game: { include: { image: true, casino: true } } };
}>;
export const BonusItem = ({bonus}: {bonus: BonusAndGameWithImageAndCasino}) => {
    return (
        <div className="p-2 bg-default-50 rounded-lg flex flex-row gap-6 justify-between hover:bg-default-100 transition-colors duration-300">
            <div className="flex flex-row gap-6">
                <img
                    src="/game.png"
                    width="150"
                    className="object-cover rounded-xl drop-shadow-xl"
                />
                <ImageDisplay imageData={bonus.game.image.data as unknown as Record<string, number>}/>
                <div className="flex flex-col justify-center min-h-full gap-1">
                    <p className="font-bold text-xl">{bonus.game.name}</p>
                    <p className="text-default-500">{bonus.game.casino.name}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center min-h-full gap-1">
                <p className="text-sm text-default-500">Mise de départ: {bonus.startingBet}€</p>
                <div className="flex flex-row gap-2">
                    <p>
                        Gain : <span className="text-green-400">{bonus.gain}€</span>
                    </p>
                    <MultiBox value={2} color="green" />
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
                <Button>Editer le gain</Button>
                <Button>Supprimer</Button>
            </div>
        </div>
    );
};
