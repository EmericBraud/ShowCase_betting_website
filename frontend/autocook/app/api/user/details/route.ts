import prisma from "@/lib/prisma";
import { getServerSessionTool } from "@/lib/apiTools";
import { NextRequest, NextResponse } from "next/server";

// Gestion de la méthode POST
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// Gestion de la méthode GET
export async function GET(req: NextRequest) {
  const session = await getServerSessionTool();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ preferences: null });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
