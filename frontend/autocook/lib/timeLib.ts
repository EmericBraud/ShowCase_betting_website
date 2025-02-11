export function isValidTimestamptz(date: string): boolean {
    const regex = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d+)?([+-]\d{2}:\d{2}|Z)$/;
return regex.test(date);
}

export function calculateDaysBetween(startDate: string, endDate: string): number {
    const start = new Date(startDate); // Convertir startDate en objet Date
    const end = new Date(endDate); // Convertir endDate en objet Date
  
    // Calculer la différence en millisecondes entre les deux dates
    const differenceInMillis = end.getTime() - start.getTime();
  
    // Convertir la différence en millisecondes en jours (en divisant par le nombre de millisecondes dans un jour)
    const daysDifference = differenceInMillis / (1000 * 3600 * 24);
  
    // Ajouter 1 pour inclure le premier jour dans le calcul
    return Math.ceil(daysDifference);
  }