import prisma from "@/lib/prisma";
import { getServerSessionTool } from "@/lib/apiTools";
import { NextRequest, NextResponse } from "next/server";

// Gestion de la méthode POST
export async function POST(req: NextRequest) {
  const session = await getServerSessionTool();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  if (!data || !data.diet || !Array.isArray(data.selectedMealsList)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userPreference = await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: {
        diet: data.diet,
        selectedMealsList: data.selectedMealsList,
      },
      create: {
        diet: data.diet,
        selectedMealsList: data.selectedMealsList,
        user: { connect: { id: user.id } },
      },
    });

    return NextResponse.json({ success: true, userPreference });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Gestion de la méthode GET
export async function GET(req: NextRequest) {
  const session = await getServerSessionTool();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const preferences = await prisma.userPreference.findUnique({
      where: { userId: session.user.id },
    });

    if (!preferences) {
      return NextResponse.json({ preferences: null });
    }

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
