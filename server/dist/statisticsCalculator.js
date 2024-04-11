"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStatistics = void 0;
// statisticsCalculator.ts
function calculateStatistics(data) {
  console.log("Data mottatt for statistikkberegning:", data);
  try {
    if (data.length === 0) {
      throw new Error("Datafeltet er tomt.");
    }
    // console.log(data);
    // Sorterer dataene for å kunne beregne statistikk
    const sortedData = data.value.sort((a, b) => a - b);
    console.log("Sorterte data:", sortedData);
    const n = sortedData.length;
    if (n === 0) {
      throw new Error("Ingen gyldige data for å beregne statistikk.");
    }
    // Beregner medianverdien
    const median =
      n % 2 === 0
        ? (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2
        : sortedData[Math.floor(n / 2)];
    // Beregner gjennomsnittsverdien
    const average = sortedData.reduce((acc, val) => acc + val, 0) / n;
    // Finner maksimumsverdien
    const max = sortedData[n - 1];
    // Finner minimumsverdien
    const min = sortedData[0];
    const statistics = { median, mean: average, max, min };
    console.log("Beregnet statistikk:", statistics);
    return statistics;
  } catch (error) {
    console.error("Feil ved beregning av statistikk:", error);
    throw error;
  }
}
exports.calculateStatistics = calculateStatistics;
