import { MultiBox } from "../MultiBox";

function formatDate(date: Date) {
    const jours = [
      "1er",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];
    const mois = [
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
  
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const heures = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    const jourFormat = jour === 1 ? "1er" : jours[jour - 1]; // Gérer "1er"
  
    return `${jourFormat} ${moisNom} ${heures}:${minutes}`;
  }
  
  export const SideBarBoard = ({
    date,
    selected,
    starting_bet,
    gains,
    onClick
  }: {
    date: Date;
    selected: boolean;
    starting_bet: number;
    gains: number;
    onClick: ()=>any;
  }) => {
    return (
      <div className={"gridSidebarItem" + (selected ? " selected" : "")} onClick={onClick} aria-label="SelectHunt">
        <p className="text-sm text-default-500">{formatDate(date)}</p>
        <div className="text-sm flex flex-row gap-2">
          D : {starting_bet}€ <span className="text-green-400">G : {gains}€</span>{" "}
          <MultiBox
            value={starting_bet === 0 ? 1 : gains / starting_bet}
            color="green"
          />
        </div>
      </div>
    );
  };