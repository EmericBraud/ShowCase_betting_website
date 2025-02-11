"use client";

import { Card, CardBody, Spinner } from "@nextui-org/react";
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

export function SetPreferences() {
  const [days, setDays] = useState(initialDays);
  const [diet, setDiet] = useState("");
  const [loading, setLoading] = useState(false);
  const [modifyState, setModifyState] = useState(false);

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
  const daysToList = (
    days: { day: string; noon: boolean; dinner: boolean }[]
  ) => {
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
            setDays(
              listToDays(data.preferences.selectedMealsList) || initialDays
            );
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
        index === dayIndex ? { ...day, [mealType]: !day[mealType] } : day
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
      <div className="spaceSubItems">
        <h4>Mes préférences :</h4>
        <Textarea
          label=""
          isDisabled={!modifyState}
          placeholder="Aucune"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
        <div className="flex flex-col gap-3">
          <Table key={`${modifyState}`}>
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
                            isDisabled={!modifyState}
                            isSelected={item[columnKey]}
                            aria-label={`${item.day} ${columnKey}`}
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
        <Button
          color={modifyState ? "secondary" : "default"}
          className="centeredText font-bold"
          onClick={() => {
            if (modifyState) {
              handleSubmit();
              setModifyState(false);
            } else {
              setModifyState(true);
            }
          }}
          isDisabled={loading}
        >
          {loading
            ? "Chargement..."
            : modifyState
              ? "Valider"
              : "Modifier mes préférences"}
        </Button>
      </div>
    </div>
  );
}

export default function profilePage() {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    emailVerified: false,
    image: null,
    createdAt: null,
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/user/details");
        if (response.ok) {
          const data = await response.json();
          if (!data || !data.name || !data.email) {
            throw Error("Invalid data");
          }
          setUserDetails(data);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <>
      <h3>Mon profil</h3>
      <Card>
        <CardBody>
          {loading ? (
            <div className="spaceSubItems">
              <div className="flex flex-row gap-3">
                <span className="font-bold w-[3.5rem]">Nom :</span>
                <Spinner size="sm" />
              </div>
              <div className="flex flex-row gap-3">
                <span className="font-bold w-[3.5rem]">Email :</span>
                <Spinner size="sm" />
              </div>
              <Button isDisabled={true}>Changer mon mot de passe</Button>
              <Divider />
            </div>
          ) : (
            <div className="spaceSubItems">
              <div className="flex flex-row gap-3">
                <span className="font-bold w-[3.5rem]">Nom :</span>
                <div className="h-[1rem] rounded-lg">{userDetails.name}</div>
              </div>
              <div className="flex flex-row gap-3">
                <span className="font-bold w-[3.5rem]">Email :</span>
                <div className="h-[1rem] rounded-lg">{userDetails.email}</div>
              </div>
              <Button>Changer mon mot de passe</Button>
              <Divider />
              <SetPreferences />
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
