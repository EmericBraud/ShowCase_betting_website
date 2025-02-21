import type { CasinoWithGamesAndImage } from '@/app/admin/page';
import { Divider } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import AddGameForm from './AddGameForm';
import ImageDisplay from '../ImageDisplay';

export default function selectedCasino({
    casino,
    count,
    refresh,
}: {
    casino: CasinoWithGamesAndImage;
    count: number;
    refresh: () => void;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const deleteGame = async (id: string) => {
        try {
            const response = await fetch('/api/game', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Passer l'ID du jeu à supprimer
            });
    
            if (!response.ok) {
                throw new Error('Échec de la suppression du jeu');
            }
    
            const result = await response.json();
            console.log('Jeu et image supprimés avec succès', result);
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppression du jeu:', error);
        }
    };
    return (
        <div className="p-2 rounded">
            <br />
            <Divider />
            <br />
            <div className="flex flex-row gap-3">
                <p className="text-lg font-bold p-2">Jeux</p>
                <Button onPress={onOpen}>Ajouter</Button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Modal Title
                                </ModalHeader>
                                <ModalBody>
                                    <AddGameForm casinoId={casino.id} onConfirm={refresh} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="bg-default-0 flex flex-wrap gap-2 mt-2">
                {casino.games.map((game) => {
                    return (
                        <div
                            key={game.id}
                            className="bg-default-100 p-3 rounded-xl text-lg colorDivHover"
                        >
                            <div className="font-bold mb-2">{game.name}</div>
                            <ImageDisplay
                                imageData={game.image.data as unknown as Record<string, number>}
                            />
                            <div className="mt-2">
                                Créé le : <br />
                                <span className="text-sm italic">
                                    {game.createdAt.toLocaleString()}
                                </span>
                            </div>
                            <Button fullWidth={true} color="danger" onPress={()=>deleteGame(game.id)}>Supprimer</Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
