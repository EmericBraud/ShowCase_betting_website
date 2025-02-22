import prisma from '@/lib/prisma';
import { getServerSessionTool } from '@/lib/apiTools';
import { NextRequest, NextResponse } from 'next/server';

// Gestion de la méthode POST
export async function POST(req: NextRequest) {
    const session = await getServerSessionTool();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        if (data.startingBet == null) {
            return NextResponse.json({ error: 'Missing field: startingBet' }, { status: 406 });
        }
        const Hunt = await prisma.hunt.create({
            data: {
                userId: session.user.id,
                startingBet: data.startingBet,
            },
        });
        return NextResponse.json({ success: true, Hunt });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Gestion de la méthode GET
export async function GET(req: NextRequest) {
    const session = await getServerSessionTool();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const hunts = await prisma.hunt.findMany({
            where: { userId: session.user.id },
            include: { bonuses: {
                include: {
                    game: {
                        include: {
                            image: true,
                            casino: true
                        }
                    }
                }
            } },
        });

        return NextResponse.json(hunts);
    } catch (error) {
        console.error('Error fetching preferences:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
