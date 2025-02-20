import { Prisma } from '@prisma/client';
import { Switch } from '@nextui-org/switch';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';
import { Indicator, IndicatorBonusOpened, IndicatorGainLoose, IndicatorMulti } from '../Indicators';
import { BonusList } from './BonusList';
import { useEffect, useState } from 'react';

export type HuntWithBonuses = Prisma.HuntGetPayload<{ include: { bonuses: true } }>;

export const BonusHunt = ({ hunt }: { hunt: HuntWithBonuses }) => {
    let name: string = '#' + hunt.id;
    let start_bet = hunt.startingBet;
    let number_games = hunt.bonuses.length;
    let opened_games = hunt.bonuses.filter((bonus) => bonus.opened).length;
    const [isPublic, setIsPublic] = useState<boolean>(hunt.opened);

    const terminateSession = async () => {
        const response = await fetch('/api/hunt/close', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ huntId: hunt.id }),
        });
        if (!response.ok) {
            throw Error('Failed to terminate hunt');
        }
    };

    useEffect(() => {
        const updateHuntVisibility = async () => {
            try {
                const response = await fetch('/api/hunt/public', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ huntId: hunt.id, isPublic: isPublic }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update hunt visibility');
                }
            } catch (error) {
                console.error('Error updating hunt visibility:', error);
            }
        };

        updateHuntVisibility();
    }, [isPublic]);

    return (
        <div>
            <div className="flex flex-row w-full gap-3 mb-2 justify-between">
                <div className="flex flex-row gap-3">
                    <h1 className="font-bold text-lg p-0.5">Bonus hunt: {name}</h1>
                    <Switch
                        defaultSelected={hunt.isPublic}
                        size="sm"
                        isSelected={isPublic}
                        onValueChange={setIsPublic}
                    >
                        Rendre public
                    </Switch>
                </div>
                <Button size="sm" color="secondary">
                    Copier le lien à partager
                </Button>
            </div>
            <Divider />
            <div className="mt-2">
                <h2>Progression - Phase d'ouverture</h2>
                <br />
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-8">
                        <Indicator title="Mise de départ" value={start_bet + '€'} />
                        <IndicatorBonusOpened
                            title="Bonus ouverts"
                            total={number_games}
                            opened={opened_games}
                        />
                        <IndicatorMulti title="Multi. breakeven" value={5} color="grey" />
                        <IndicatorMulti title="Multi. moyen" value={10} color="green" />
                        <IndicatorGainLoose
                            title="Gain / Perte"
                            gain={hunt.gains}
                            bet={hunt.startingBet}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button color="default">Statistiques</Button>
                        <Button color="primary">Ajouter des bonus</Button>
                        <Button color="danger" onPress={terminateSession}>
                            Terminer la session
                        </Button>
                    </div>
                </div>
            </div>
            <br />
            <Divider />
            <div className="mt-2" />
            <BonusList />
        </div>
    );
};
