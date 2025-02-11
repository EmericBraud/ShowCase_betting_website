"use client";
import { HeartFilledIcon, CookingIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
  date: string;
};

function NextRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer la prochaine recette
    const fetchNextRecipe = async () => {
      try {
        const response = await fetch('/api/recipe/get_next');
        const data = await response.json();

        if (response.ok && data && data.data) {
          setRecipe(data.data);  // Mettre à jour l'état avec la recette récupérée
        } else {
          console.error('Error fetching recipe:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);  // Désactive le chargement une fois la requête terminée
      }
    };

    fetchNextRecipe();
  }, []);

  if (loading) {
    return <div>Chargement...</div>; // Affiche un message de chargement pendant la récupération des données
  }

  // Si aucune recette n'est trouvée ou que l'API retourne null
  if (!recipe) {
    return <div>Aucune recette à afficher.</div>;
  }

  return (
    <div className="mt-4 rounded-xl colorDivHover w-full p-3">
      <h4 className="w-full mb-2 flex items-center relative">
        <span className="w-80">{recipe.title}</span>
        <span className="text-default-100 absolute right-3">
          <HeartFilledIcon className="ml-3 stroke-danger fill-current" size={20} />
        </span>
      </h4>
      <Divider className="my-3" />

      {/* Afficher les étapes de la recette */}
      <ul className="list-decimal ml-5">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <Divider className="my-3" />

      {/* Afficher les ingrédients de la recette */}
      <ul className="list-disc ml-5">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <h4 className="text-2xl mb-3">Mon espace</h4>
      <div className="flex w-full justify-between space-x-3">
        <Button className="rounded-lg p-5 w-1/2 h-max text-left">
          <div className="w-full">
            <h4 className="flex justify-between w-full ">
              <p className="pt-0.5">Historique</p>{" "}
              <CookingIcon color="#99C7FB" height={23} />
            </h4>
            28 recettes
          </div>
        </Button>
        <Button className="rounded-lg p-5 w-1/2 h-max text-left">
          <div className="w-full">
            <h4 className="flex justify-between w-full">
              <p className="pt-0.5">Favoris</p>{" "}
              <HeartFilledIcon color="#F31260" className="ml-3" size={23} />
            </h4>
            37 recettes
          </div>
        </Button>
      </div>
      <Divider className="my-4"/>
      <h4 className="text-2xl mb-3">
        Prochain repas
      </h4>
      <NextRecipe/>
      <Button className="my-5 w-full text-xl font-bold bg-primary-500 p-8">
        Gérer mes repas
      </Button>
    </div>
  );
}
