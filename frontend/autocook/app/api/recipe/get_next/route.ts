import prisma from "@/lib/prisma";
import { getServerSessionTool } from "@/lib/apiTools";
import { NextRequest, NextResponse } from "next/server";

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
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate()-1);
  
      return NextResponse.json({data: await prisma.recipe.findFirst({
        orderBy:{
          date: "asc"
        },
        where:{
          date:{
            gte: currentDate
          },
          status: true
        }
      })});
    } catch (error) {
      console.error("Error fetching preferences:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }