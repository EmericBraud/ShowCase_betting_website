'use client';

import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { useEffect, useState } from 'react';
import { SideBarBoard } from './homePage/sideBar/SideBarBoard';
import { VideoBanner } from './homePage/VideoBanner';
import { BonusHunt } from './homePage/bonus/BonusHunt';
import type { HuntFullType } from './homePage/bonus/BonusHunt';

export const HomePage = () => {
    const [hunts, setHunts] = useState<HuntFullType[]>([]);
    const [startingBet, setStartingBet] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHunt, setSelectedHunt] = useState<HuntFullType | null>(null);

    useEffect(() => {
        fetchHunts();
    }, []);

    const fetchHunts = async () => {
        const response = await fetch('/api/hunt');
        const data = await response.json();

        if (response.ok && data) {
            setHunts(data as HuntFullType[]);
            if (!selectedHunt && data.length > 0) {
                setSelectedHunt(data[0]);
            }
        }
    };

    const postHunt = async () => {
        const response = await fetch('/api/hunt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startingBet }),
        });

        if (!response.ok) {
            throw Error('Failed to post hunt');
        }

        setIsOpen(false);
        fetchHunts();
    };

    return (
        <div>
            <div className="w-[80%] m-auto h-[130px] overflow-hidden flex items-center rounded-xl mb-6">
                <VideoBanner />
            </div>
            <div className="maingrid">
                <div className="gridSidebar overflow-hidden">
                    <p className="text-center text-white font-bold p-2 animate-gradient">
                        Mes bonus hunts
                    </p>
                    <VideoBanner />
                    <div className="flex flex-col h-full">
                        <div>
                            {hunts.map((hunt) => (
                                <SideBarBoard
                                    key={hunt.id}
                                    date={new Date(hunt.createdAt)}
                                    selected={selectedHunt?.id === hunt.id}
                                    starting_bet={hunt.startingBet}
                                    gains={hunt.gains}
                                    onClick={() => setSelectedHunt(hunt)}
                                />
                            ))}
                        </div>
                        {/* POPUP AJOUT HUNT */}
                        <Popover placement="top" isOpen={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger>
                                <Button className="mt-3" color="primary">
                                    Ajouter
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <Input
                                        label="Mise de départ"
                                        labelPlacement="outside"
                                        placeholder="0.00"
                                        startContent={
                                            <span className="text-default-400 text-small">€</span>
                                        }
                                        type="number"
                                        value={startingBet.toString()}
                                        onChange={(e) =>
                                            setStartingBet(parseFloat(e.target.value) || 0)
                                        }
                                    />
                                    <Button onPress={postHunt} className="mt-2">
                                        Valider
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="gridContent rounded">
                    {selectedHunt ? (
                        <BonusHunt hunt={selectedHunt} />
                    ) : (
                        <p className="text-white text-center">Sélectionnez une hunt</p>
                    )}
                </div>
            </div>
        </div>
    );
};
