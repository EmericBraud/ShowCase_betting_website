"use client";
import React, { useEffect, useState } from "react";
import {
  Divider,
  Textarea,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
// Structure initiale des jours de la semaine
const initialDays = [
  { day: "Lundi", noon: false, dinner: false },
  { day: "Mardi", noon: false, dinner: false },
  { day: "Mercredi", noon: false, dinner: false },
  { day: "Jeudi", noon: false, dinner: false },
  { day: "Vendredi", noon: false, dinner: false },
  { day: "Samedi", noon: false, dinner: false },
  { day: "Dimanche", noon: false, dinner: false },
];

const columns = [
  { key: "day", label: "JOUR" },
  { key: "noon", label: "Midi" },
  { key: "dinner", label: "Soir" },
];

export default function SetPreferences() {
  const router = useRouter();
  const [days, setDays] = useState(initialDays);
  const [diet, setDiet] = useState("");
  const [loading, setLoading] = useState(false);

  // Convertir une liste de 14 booléens en tableau d'objets
  const listToDays = (list: boolean[]) => {
    if (!list || list.length !== 14) return initialDays;
    return initialDays.map((day, index) => ({
      ...day,
      noon: list[index * 2],
      dinner: list[index * 2 + 1],
    }));
  };
  // Convertir un tableau d'objets en liste de 14 booléens
  const daysToList = (days: {day:string,noon:boolean,dinner:boolean}[]) => {
    return days.flatMap((day) => [day.noon, day.dinner]);
  };

  // Charger les préférences utilisateur existantes
  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/preferences");
        if (response.ok) {
          const data = await response.json();
          if (data?.preferences) {
            // Mettre à jour les jours et le régime alimentaire
            setDays(listToDays(data.preferences.selectedMealsList) || initialDays);
            setDiet(data.preferences.diet || "");
          }
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  

  // Gérer les changements dans les switches
  const handleSwitchChange = (dayIndex, mealType) => {
    setDays((prevDays) =>
      prevDays.map((day, index) =>
        index === dayIndex
          ? { ...day, [mealType]: !day[mealType] }
          : day
      )
    );
  };

  // Envoi des données mises à jour
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diet,
          selectedMealsList: daysToList(days),
        }),
      });

      if (response.ok) {
        console.log("Preferences saved successfully");
        router.push("/");
      } else {
        console.error("Failed to save preferences");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h3 className="centeredText">Quelques questions avant de commencer !</h3>
        <br />
        <Divider />
      </div>

      <div className="spaceSubItems">
        <br />
        <h4>Régime alimentaire et préférences culinaires :</h4>
        <Textarea
          label=""
          placeholder="Végétarien, sans gluten, n'aime pas le maïs..."
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
        <Divider />
        <br />
        <h4>Quels jours souhaitez-vous cuisiner ?</h4>
        <div className="flex flex-col gap-3">
          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  className={column.key === "day" ? "" : "centeredText"}
                  key={column.key}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={days}>
          {(item) => (
            <TableRow key={item.day}>
              {(columnKey) => {
                if (columnKey === "day") {
                  return <TableCell>{item[columnKey]}</TableCell>;
                }
                return (
                  <TableCell className="centeredText">
                    <Switch
                      isSelected={item[columnKey]}
                      onChange={() =>
                        handleSwitchChange(
                          days.findIndex((day) => day.day === item.day),
                          columnKey
                        )
                      }
                    />
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>

          </Table>
        </div>
        <Divider />
        <br />
        <Button
          color="secondary"
          className="centeredText font-bold"
          onClick={handleSubmit}
          isDisabled={loading}
        >
          {loading ? "Chargement..." : "Valider"}
        </Button>
      </div>
    </div>
  );
}
