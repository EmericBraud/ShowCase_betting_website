import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { getServerSessionTool } from '@/lib/apiTools';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const session = await getServerSessionTool();
    
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  if (req.method === "POST") {
    try {
      const { name, casinoId, imageData } = await req.json();

      if (!name || !casinoId || !imageData) {
        return NextResponse.json({ error: "Tous les champs sont requis." }, {status: 400});
      }

      // Création d'une image dans la BDD
      const image = await prisma.image.create({
        data: {
          data: new Uint8Array(Buffer.from(imageData, "base64")),
        },
      });

      // Création du jeu avec l'image associée
      const game = await prisma.game.create({
        data: {
          name,
          casinoId,
          imageId: image.id,
        },
      });

      return NextResponse.json({ success: true, game: game });
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu :", error);
      return NextResponse.json({ error: "Server Error" }, {status: 500});
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, {status: 405});
}
}


export async function DELETE(req: NextRequest) {
    const session = await getServerSessionTool();
    
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  if (req.method === "DELETE") {
    try {
      const { id } = await req.json();

      if (!id) {
        return NextResponse.json({ error: "Tous les champs sont requis." }, {status: 400});
      }

      // Création d'une image dans la BDD
      const deletedGame = await prisma.game.delete({
        where:{
            id: id
        },
        include: { image: true },

      });
      if (deletedGame.image) {
        await prisma.image.delete({
            where: { id: deletedGame.image.id },
        });
    }

      return NextResponse.json({ success: true, deletedGame: deletedGame });
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu :", error);
      return NextResponse.json({ error: "Server Error" }, {status: 500});
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, {status: 405});
}
}