import { PrismaClient } from '@prisma/client';

// Crée une nouvelle instance de PrismaClient
const prismaClientSingleton = () => new PrismaClient();

// Déclare une variable globale pour éviter de créer plusieurs instances de Prisma en mode développement.
declare global {
    var prismaGlobal: PrismaClient | undefined;
}

// Crée une instance de PrismaClient, et utilise l'instance globale en mode développement.
const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    // En mode développement, stocke l'instance de Prisma dans global pour éviter des réinstanciations lors des rechargements de page
    global.prismaGlobal = prisma;
}

export default prisma;
