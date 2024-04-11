// statisticsCalculator.ts
export function calculateStatistics(data: any[]): { median: number, mean: number, max: number, min: number } {
    console.log('Data mottatt for statistikkberegning:', data);
    try {
        if (data.length === 0) {
            throw new Error('Datafeltet er tomt.');
        }

        // Sorterer dataene for å kunne beregne statistikk
        const sortedData = data.slice().sort((a, b) => a - b);
        console.log('Sorterte data:', sortedData);
        const n = sortedData.length;
        if (n === 0) {
            throw new Error('Ingen gyldige data for å beregne statistikk.');
        }

        // Beregner medianverdien
        const median = n % 2 === 0 ? (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2 : sortedData[Math.floor(n / 2)];
        // Beregner gjennomsnittsverdien
        const mean = sortedData.reduce((acc, val) => acc + val, 0) / n;
        // Finner maksimumsverdien
        const max = sortedData[n - 1];
        // Finner minimumsverdien
        const min = sortedData[0];

        const statistics = { median, mean, max, min };
        console.log('Beregnet statistikk:', statistics);
        return statistics;
    } catch (error) {
        console.error('Feil ved beregning av statistikk:', error);
        throw error;
    }
}
