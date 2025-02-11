import envVars from "../envVars";
import type { APIresponse } from "../apiTools";
export async function generateRecipes(amount: number, constraints: string): Promise<APIresponse<string[]>> {
  try {
    const response = await fetch(`${envVars.API_URL}/chatgpt/generate_recipes?amount=${amount}&constraints=${constraints}`);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des recettes : ${response.statusText}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.every(item => typeof item === 'string')) {
      if (data.length !== amount) {
        throw new Error("Le montant de recettes générées ne correspond pas !");
      }
      return { success: true, data }; // Cas de succès
    } else {
      throw new Error("Les données récupérées ne sont pas une liste de chaînes de caractères.");
    }
  } catch (error) {
    console.error("Erreur dans generateRecipes:", error);
    return { success: false, error: (error as Error).message }; // Cas d'erreur
  }
}
export type DescribeRecipeType = {
  ingredients: string[],
  steps: string[]
}
export function isDescribeRecipeType(value: unknown): value is DescribeRecipeType {
  if (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as DescribeRecipeType).ingredients) &&
    (value as DescribeRecipeType).ingredients.every(item => typeof item === "string") &&
    Array.isArray((value as DescribeRecipeType).steps) &&
    (value as DescribeRecipeType).steps.every(item => typeof item === "string")
  ) {
    return true;
  }
  return false;
}
export async function describeRecipe(recipe: string, constraints: string) : Promise<APIresponse<DescribeRecipeType>>{
  try{
    const response = await fetch(`${envVars.API_URL}/chatgpt/describe_recipe?recipe=${recipe}&constraints=${constraints}`);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de la recette : ${response.statusText}`);
    }
    const data = await response.json();
    if(!isDescribeRecipeType(data)){
      throw new Error("La réponse ne correspond pas au format attendu");
    }

    return { success: true, data: data };

  }catch(error){
    console.error("Erreur dans generateRecipes:", error);
    return { success: false, error: (error as Error).message };
  }
}
