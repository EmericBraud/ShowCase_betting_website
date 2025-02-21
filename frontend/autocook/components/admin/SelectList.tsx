'use client';
import { Select, SelectItem } from '@nextui-org/react';
import type { CasinoWithGamesAndImage } from '@/app/admin/page';

export default function SelectList({
    casinos,
    setCasino,
}: {
    casinos: CasinoWithGamesAndImage[];
    setCasino: (caniso: CasinoWithGamesAndImage) => any;
}) {
    function handleChange(id: string){
        const matchingCasino = casinos.filter((casino) => casino.id === id);
        if(matchingCasino.length === 1){
            setCasino(matchingCasino[0]);
        }
    }
    return (
        <Select
            className="max-w-xs mr-3"
            label="Sélectionnez un casino"
            onChange={(e) => handleChange(e.target.value)}
        >
            {casinos.map((casino) => (
                <SelectItem key={casino.id}>{casino.name}</SelectItem>
            ))}
        </Select>
    );
}
