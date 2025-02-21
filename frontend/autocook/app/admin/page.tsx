'use client';

import { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';
import SelectList from '@/components/admin/SelectList';
import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Input } from '@nextui-org/input';
import SelectedCasino from '@/components/admin/SelectedCasino';

export type CasinoWithGamesAndImage = Prisma.CasinoGetPayload<{
    include: { games: { include: { image: true } } };
}>;

export default function Admin() {
    const [casinos, setCasinos] = useState<CasinoWithGamesAndImage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [casinoName, setCasinoName] = useState<string>('');
    const [selectedCasino, setSelectedCasino] = useState<CasinoWithGamesAndImage | null>(null);
    const [count, setCount] = useState(0);
    const fetchCasinos = async () => {
      try {
          const response = await fetch('/api/casino');
          const data = await response.json();

          if (response.ok && data && data.casinos) {
              setCasinos(data.casinos as CasinoWithGamesAndImage[]);
              setCount(count + 1);
          }
      } catch (error) {
          console.error('Erreur lors du chargement des casinos', error);
      }
  };
    useEffect(() => {
        

        fetchCasinos();
    }, []); // <- Ajout d'un tableau de dépendances pour éviter une boucle infinie

    async function createCasino() {
        setIsOpen(false);
        const response = await fetch('/api/casino', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: casinoName }),
        });

        if (!response.ok) {
            throw Error('Failed to post casino');
        }

        setCasinoName("");
        fetchCasinos();
    }
    return (
        <div className="rounded bg-default-50 p-3">
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <SelectList casinos={casinos} setCasino={setSelectedCasino}/>
            <Popover isOpen={isOpen}>
                <PopoverTrigger>
                    <Button color="primary" onClick={() => setIsOpen(true)}>
                        Ajouter un casino
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Input
                        label="Nom"
                        value={casinoName}
                        onChange={(e) => setCasinoName(e.target.value)}
                    />
                    <Button className="mt-2" fullWidth={true} onPress={createCasino}>
                        Valider
                    </Button>
                </PopoverContent>
            </Popover>
            {selectedCasino != null && <SelectedCasino casino={selectedCasino} count={count} refresh={fetchCasinos}/>}
        </div>
    );
}
