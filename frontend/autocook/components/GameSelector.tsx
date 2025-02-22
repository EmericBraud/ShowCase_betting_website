import { Select, SelectItem } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { CircularProgress } from '@nextui-org/react';
import { Prisma } from '@prisma/client';
export type CasinoFullType = Prisma.CasinoGetPayload<{
    include: { games: { include: { image: true } } };
}>;

const fetchData = async (): Promise<{ success: boolean; casinos: CasinoFullType[] }> => {
    const response = await fetch('/api/casino');
    return response.json();
};

export default function GameSelector() {
    const { data, isLoading, error } = useQuery('myData', fetchData);
    
    function handleChange(id: string){

    }

    if (isLoading) return <CircularProgress aria-label="Loading..." />;
    if (error) return <p>Erreur</p>;

    return (
        <pre>
            {data ? (
                <Select label="Casino" onChange={(e) => handleChange(e.target.value)}>
                    {data.casinos.map((casino) => (
                        <SelectItem key={casino.id}>{casino.name}</SelectItem>
                    ))}
                </Select>
            ) : (
                <div>Erreur</div>
            )}
        </pre>
    );
}
