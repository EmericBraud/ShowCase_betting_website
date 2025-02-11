"use client";
import { DatePicker, Button, Divider, ScrollShadow, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function ShoppingListGenerator() {
  const [startDate, setStartDate] = useState(today(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(today(getLocalTimeZone()).add({ weeks: 1 }));

  const lunchList = [
    { date: today(getLocalTimeZone()), title: "Sauté de pommes de terre", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 3 }), title: "Pâtes carbo", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 4 }), title: "Boeuf bourgignon", noon: false },
    { date: today(getLocalTimeZone()).add({ days: 5 }), title: "Salade César", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 6 }), title: "Poisson grillé", noon: false },
    { date: today(getLocalTimeZone()), title: "Sauté de pommes de terre", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 3 }), title: "Pâtes carbo", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 4 }), title: "Boeuf bourgignon", noon: false },
    { date: today(getLocalTimeZone()).add({ days: 5 }), title: "Salade César", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 6 }), title: "Poisson grillé", noon: false },
    { date: today(getLocalTimeZone()), title: "Sauté de pommes de terre", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 3 }), title: "Pâtes carbo", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 4 }), title: "Boeuf bourgignon", noon: false },
    { date: today(getLocalTimeZone()).add({ days: 5 }), title: "Salade César", noon: true },
    { date: today(getLocalTimeZone()).add({ days: 6 }), title: "Poisson grillé", noon: false },
  ];

  return (
    <div className="flex flex-col h-[60vh]">
      <div>
        <div className="flex space-x-2">
          <DatePicker
            onChange={(newDate) => {
              if (newDate) setStartDate(newDate);
            }}
            value={startDate}
            maxValue={endDate}
            label="Du"
          />
          <DatePicker
            onChange={(newDate) => {
              if (newDate) setEndDate(newDate);
            }}
            value={endDate}
            label="Au"
            minValue={startDate}
          />
        </div>
        <Button color="secondary" className="mt-4 w-full font-bold text-lg h-12">
          Générer ma liste de courses
        </Button>
        <Divider className="my-4" />
      </div>

      <div className="flex-1 flex flex-col h-full">
        <h4 className="text-xl">Repas pris en compte :</h4>
        <ScrollShadow className="flex flex-col space-y-2 mt-3 snap-y flex-1 overflow-y-auto h-full">
          {lunchList.map((lunch, index) => {
            // Convertir ZonedDateTime en Date pour utilisation avec toLocaleDateString
            const formattedDate = lunch.date.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone);

            return (
              <Popover placement="top-start" key={`${index}-popover`} backdrop="blur">
              <PopoverTrigger>
                <div key={index} className="flex justify-between w-full bg-default-50 p-3 rounded-xl snap-center">
                  <div className="font-bold text-sm">{lunch.title}</div>
                  <div className="text-primary-800 font-bold text-sm">
                    {formattedDate.toLocaleDateString("fr-FR", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-transparent p-0 m-0">
                <Button color="danger" className="font-bold">
                    Retirer cet élément de la liste
                </Button>
              </PopoverContent>
            </Popover>
            );
          })}
        </ScrollShadow>
      </div>
    </div>
  );
}
