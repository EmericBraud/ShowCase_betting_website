import prisma from "@/lib/prisma";
import { getServerSessionTool } from "@/lib/apiTools";
import { NextRequest, NextResponse } from "next/server";
import { calculateDaysBetween, isValidTimestamptz } from "@/lib/timeLib";
import { describeRecipe, generateRecipes } from "@/lib/pythonAPI/recipe";

// Gestion de la méthode POST
export type recipePostData = {
  startDate: string;
  endDate: string;
};
export function isRecipePostData(data: any): data is recipePostData {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.startDate === "string" &&
    typeof data.endDate === "string"
  );
}

function validateDates(data: { startDate: string; endDate: string }) {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const nowDate = new Date();

  // Vérifier que la différence entre startDate et nowDate est d'au maximum 1 jour (24h)
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const diffStartAndNow = Math.abs(startDate.getTime() - nowDate.getTime());

  if (diffStartAndNow > oneDayInMillis) {
    return {
      isValid: false,
      message: "Start date must be within 1 day from now.",
    };
  }

  // Vérifier que la différence entre startDate et endDate est d'au maximum 7 jours
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
  const diffStartAndEnd = Math.abs(startDate.getTime() - endDate.getTime());

  if (diffStartAndEnd > sevenDaysInMillis) {
    return {
      isValid: false,
      message: "Start date and end date must be within 7 days of each other.",
    };
  }

  // Si toutes les vérifications passent
  return { isValid: true };
}
export async function POST(req: NextRequest) {
  const session = await getServerSessionTool();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  if (!isRecipePostData(data)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  if (
    !(isValidTimestamptz(data.startDate) && isValidTimestamptz(data.endDate))
  ) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const dateValidation = validateDates(data);
  if (!dateValidation.isValid) {
    return NextResponse.json(
      { error: dateValidation.message },
      { status: 400 }
    );
  }
  await prisma.recipe.updateMany({
    where: {
      userId: session.user.id, // Assurez-vous que c'est pour le même utilisateur
      date: {
        gte: data.startDate,
        lte: data.endDate,
      },
    },
    data: {
      status: false, // Mettre à jour le statut à false
    },
  });

  //If all checks are passed, calling Python API to generate recipes
  const amount = calculateDaysBetween(data.startDate, data.endDate);
  const constraints = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      preferences: true, // Inclure les préférences de l'utilisateur
    },
  });
  let constraints_str = ""
  if (constraints && constraints.preferences) {
    constraints_str = constraints.preferences.diet;
  }
  try{
    const recipes = await generateRecipes(amount,constraints_str);
    if(!recipes.success){
      return NextResponse.json({ error: recipes.error }, { status: 400 });
    }
    await Promise.all(
      recipes.data.map(async (recipe, index) => {
        let date = new Date(data.startDate);
        date.setDate(date.getDate() + index);
    
        // Appeler `describeRecipe` et vérifier le succès
        const description = await describeRecipe(recipe, constraints_str);
        if (!description.success) {
          throw new Error(description.error);
        }
    
        // Créer une recette dans la base de données
        await prisma.recipe.create({
          data: {
            title: recipe,
            userId: session.user.id,
            date: date,
            ingredients: description.data.ingredients,
            steps: description.data.steps,
            status: true
          },
        });
      })
    );
    
    return NextResponse.json({ success: true, recipes });
  }catch(error){
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
  
}
