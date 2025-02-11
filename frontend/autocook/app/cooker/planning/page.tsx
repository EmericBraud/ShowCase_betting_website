"use client";

import { useState, useRef,useEffect, Fragment } from "react";
import React from "react";
import {Alert, Spinner} from "@nextui-org/react";
import { useSwipeable } from "react-swipeable";
import {
  Badge,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Accordion,
  AccordionItem,
  RangeCalendar,
} from "@nextui-org/react";
import {today, getLocalTimeZone, toTimeZone} from "@internationalized/date";
import { ReloadIcon } from "@/components/icons";
interface MonthSelectorProps {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

function MonthSelector({
  currentMonth,
  currentYear,
  onMonthChange,
}: MonthSelectorProps) {
  const currentDate = new Date();

  // Tableau des mois
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  // Fonction pour passer au mois suivant
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  // Fonction pour passer au mois précédent
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  // Gestion des gestes de glissement
  const handlers = useSwipeable({
    onSwipedLeft: goToNextMonth,
    onSwipedRight: goToPreviousMonth,
    trackMouse: true, // Permet d'utiliser la souris pour tester
  });
  return (
    <div {...handlers} className="place-content-center flex">
      <ReloadIcon
        width={32}
        className="rotatingIcon w-min cursor-pointer mr-2"
        onClick={(event) => {
          const target = event.target as HTMLElement; // Correction TypeScript
          target.classList.add("animate-rotation");
          const nowDate = new Date();
          onMonthChange(nowDate.getMonth(), nowDate.getFullYear());
          target.addEventListener(
            "animationend",
            () => {
              target.classList.remove("animate-rotation");
            },
            { once: true }
          );
        }}
      />
      <div className="rounded-xl overflow-hidden bg-default-200 flex place-content-center w-min">
        <Button isIconOnly={true} onPress={goToPreviousMonth}>
          {"<"}
        </Button>
        <div className="w-40 text-center p-2 select-none cursor-pointer">
          <h2>
            {months[currentMonth]} {currentYear}
          </h2>
        </div>
        <Button isIconOnly={true} onPress={goToNextMonth}>
          {">"}
        </Button>
      </div>
      <div className="w-8">

      </div>
    </div>
  );
}

function Planning() {
  const [selectedDate, updateSelectedDate] = useState(new Date());
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Obtenez le jour actuel

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const adjustedFirstDay = (firstDayOfWeek === 0 ? 7 : firstDayOfWeek) - 1;
  const totalCells = adjustedFirstDay + daysInMonth; // Total des cases remplies
  const emptyCellsAtEnd = (7 - (totalCells % 7)) % 7; // Cases vides restantes pour compléter une ligne
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const emptyBoxClass = "text-center font-bold p-3 h-16";
  const filledBoxClass = "text-center font-bold bg-default-50 p-3 rounded popInText h-16";
  const filledBoxClassNotif =
    "text-center font-bold bg-default-100 p-3 rounded-md w-full h-16 popInText";
  const [openDrawers, setOpenDrawers] = useState<Set<number>>(new Set());
  const toggleDrawer = (day: number) => {
    setOpenDrawers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };
  const goToNextMonth = () => {
    if (month === 11) {
      handleMonthChange(0, year + 1);
    } else {
      handleMonthChange(month + 1, year);
    }
  };

  // Fonction pour passer au mois précédent
  const goToPreviousMonth = () => {
    if (month === 0) {
      handleMonthChange(11, year - 1);
    } else {
      handleMonthChange(month - 1, year);
    }
  };
  const handleMonthChange = (month: number, year: number) => {
    updateSelectedDate(new Date(year, month));
  };
  const handlers = useSwipeable({
    onSwipedLeft: goToNextMonth,
    onSwipedRight: goToPreviousMonth,
    trackMouse: true, // Permet d'utiliser la souris pour tester
  });
  useEffect(() => {
    // Fermer tous les drawers lorsqu'on change de mois/année
    setOpenDrawers(new Set());
  }, [month, year]);

  return (
    <div className="w-full">
      <MonthSelector
        currentMonth={month}
        currentYear={year}
        onMonthChange={handleMonthChange}
      />
      <br />
      <div {...handlers} className="grid grid-cols-7 rounded-xl overflow-hidden bg-default-50" key={`${month}-${year}`}>
        {/* En-tête des jours */}
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
          <div key={index} className={emptyBoxClass}>
            {day}
          </div>
        ))}

        {/* Cases vides avant le début du mois */}
        {Array.from({ length: adjustedFirstDay }).map((_, index) => (
          <div key={`empty-start-${index}`} className={emptyBoxClass}></div>
        ))}

        {/* Affichage des jours */}
        {days.map((day) => {
          const isToday = day === currentDay && currentDate.getMonth() === month && currentDate.getFullYear() === year;
          if(day%13==0){
            return (
              <Fragment key={`day-${day}`}>
                <Badge key={`badge-${day}`} content="5" color="primary" size="lg">
                  <Button
                    onPress={() => toggleDrawer(day)}
                    isIconOnly={true}
                    className={
                      filledBoxClassNotif + (isToday ? " text-secondary-600" : "")
                    }
                  >
                    {day}
                  </Button>
                </Badge>
  
                <Drawer
                  key={`drawer-${day}`}
                  isOpen={openDrawers.has(day)}
                  onOpenChange={() => toggleDrawer(day)}
                >
                  <DrawerContent>
                    {(onClose) => (
                      <>
                        <DrawerHeader className="flex flex-col gap-1">
                          {day}
                        </DrawerHeader>
                        <DrawerBody>
                          <Accordion>
                            <AccordionItem key={`item-noon-${day}`} aria-label="Midi - Sauté de pommes de terre" title="Midi - Sauté de pommes de terre">
                              La recette
                            </AccordionItem>
                            <AccordionItem key={`item-lunch-${day}`} aria-label="Soir - Pâtes au pesto" title="Soir - Pâtes au pesto">
                              La recette
                            </AccordionItem>
                          </Accordion>
                        </DrawerBody>
                        <DrawerFooter>
                          <Button color="danger" variant="light" onPress={onClose}>
                            Fermer
                          </Button>
                          <Button color="primary" onPress={onClose}>
                            Action
                          </Button>
                        </DrawerFooter>
                      </>
                    )}
                  </DrawerContent>
                </Drawer>
              </Fragment>
            );
          }
          return(
            <div className={filledBoxClass + (isToday ? " text-secondary-600" : "")}>
              {day}
            </div>
          )
         
        })}

        {/* Cases vides après la fin du mois */}
        {Array.from({ length: emptyCellsAtEnd }).map((_, index) => (
          <div key={`empty-end-${index}`} className={emptyBoxClass}></div>
        ))}
      </div>
    </div>
  );
}

function RecipesGeneratorDrawer({
  isOpen,
  onIsOpenChange
}:{
  isOpen: boolean,
  onIsOpenChange: (newValue: boolean) => void
}){
  let [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });
  let [loading, setLoading] = React.useState<boolean>(false);
  const minDate = today(getLocalTimeZone());
  const maxDate = today(getLocalTimeZone()).add({weeks: 1});
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: value.start.toDate(localTimeZone).toISOString(),
          endDate: value.end.toDate(localTimeZone).toISOString()
        }),
      });

      if (response.ok) {
        console.log("Recipes created successfully");
      } else {
        console.error("Failed to create recipes");
      }
    } catch (error) {
      console.error("Error creating recipes :", error);
    } finally {
      setLoading(false);
      onIsOpenChange(false);
    }
  };
  return(
    <Drawer
        isOpen={isOpen}
      >
        <DrawerContent>
          
          <>
            <DrawerHeader className="flex flex-col gap-1">
              Générer mes recettes
            </DrawerHeader>
            <DrawerBody className="bg-background">
              <div>
                <h4>
                  Choisissez les jours
                </h4>
                <div className="flex justify-center mt-8 mb-8 scale-110">
                  <RangeCalendar aria-label="Date (Controlled)" onChange={setValue} value={value} minValue={minDate} maxValue={maxDate}/>
                </div>
                
                <Button onPress={handleSubmit} color="secondary" fullWidth={true} className="text-lg font-bold p-6 mt-3 mb-4">
                  Générer mes repas{
                  loading ?(
                      <Spinner color="primary"/>
                    ):(<></>)
                  }
                </Button>
                <div>
                  <Alert color="primary" title="Pas assez d'options ? Passez à pro !" description="" className="h-min"/>
                </div>
                
              </div>
              
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={()=>onIsOpenChange(false)}>
                Fermer
              </Button>
              <Button color="primary" onPress={()=>onIsOpenChange(false)}>
                Action
              </Button>
            </DrawerFooter>
          </>
        
        </DrawerContent>
      </Drawer>
    
  );
}

export default function PlanningPage(){
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return(
    <>
      <Planning/>
      <Button fullWidth={true} color="secondary" className="font-bold mt-3 text-md p-6" onPress={()=>setIsOpen(true)}>
        Générer mes recettes
      </Button>
      <RecipesGeneratorDrawer isOpen={isOpen} onIsOpenChange={(newValue: boolean)=> setIsOpen(newValue)}/>
    </>
  )
}