import prisma from '@/lib/prisma';
import { getServerSessionTool } from '@/lib/apiTools';
import { NextRequest, NextResponse } from 'next/server';

// Gestion de la méthode POST
export async function POST(req: NextRequest) {
    const session = await getServerSessionTool();

    if (!session || !session.user || !session.user.id || !session.user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        if(body.name == null){
            return NextResponse.json({error: 'Missing argument'}, {status: 406});
        }
        const casino = await prisma.casino.create({
            data: {
                name: body.name
            }
        });
        return NextResponse.json({ success: true, casinos: casino });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSessionTool();

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const Casinos = await prisma.casino.findMany({
            include:{
                games: {
                    include: {
                        image: true
                    }
                }
            }
        });
        return NextResponse.json({ success: true, casinos: Casinos });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
