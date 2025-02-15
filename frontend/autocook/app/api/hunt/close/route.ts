import prisma from "@/lib/prisma";
import { getServerSessionTool } from "@/lib/apiTools";
import { NextRequest, NextResponse } from "next/server";

// Gestion de la méthode POST
export async function POST(req: NextRequest) {
  const session = await getServerSessionTool();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    if(!data.huntId){
        return NextResponse.json({error: "Missing field: huntId"}, {status: 406});
    }
    const Hunt = await prisma.hunt.update({
        where: {id: data.huntId},
        data: {
            opened: false
        }
    });
    return NextResponse.json({ success: true, Hunt });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Gestion de la méthode GET
export async function GET(req: NextRequest) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
