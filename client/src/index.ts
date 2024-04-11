// index.ts
// Importer nødvendige moduler
import axios from "axios";

// Definer URL for API-endepunktet
const API_ENDPOINT = '/api/data';

// Deklarer variabler
let statisticVariable: string;
let regionType: string;
let regions: string[];
let years: string[];

// Definer en funksjon for å håndtere skjemainnsending
const handleFormSubmit = async (event: Event) => {
    console.log('Form submitted, handling data...');
    
    // Flytter variabelhentingen inn i funksjonen
    statisticVariable = (document.getElementById("statisticVariable") as HTMLInputElement).value;
    regionType = (document.getElementById("regionType") as HTMLInputElement).value;
    regions = (document.getElementById("regions") as HTMLInputElement).value.split(",");
    years = [
        (document.getElementById("year1") as HTMLSelectElement).value,
        (document.getElementById("year2") as HTMLSelectElement).value,
        (document.getElementById("year3") as HTMLSelectElement).value
    ];

    console.log('Sending data to server:', { statisticVariable, regionType, regions, years });

    event.preventDefault(); // Hindre standard skjemainnsending
    
    try {
        // Send brukerens input til serveren
        const response = await axios.post(API_ENDPOINT, { statisticVariable, regionType, regions, years }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Håndter mottatte data
        const statistics = response.data;
        updateUIWithStatistics(statistics);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError('Failed to fetch data. Please try again later.');
    }
};

// Oppdater brukergrensesnittet med statistikkene
const updateUIWithStatistics = (statistics: any) => {
    // Finn div-elementet for resultatene
    const resultsDiv = document.getElementById('results');

    // Sjekk om div-elementet ble funnet
    if (resultsDiv) {
        // Tøm innholdet først
        resultsDiv.innerHTML = '';

        // Opprett en tabell for å vise statistikkene
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Statistikkvariabel</th>
                <th>Median</th>
                <th>Gjennomsnitt</th>
                <th>Maksimum</th>
                <th>Minimum</th>
            </tr>
        `;

        // Opprett en rad for hver statistikk
        const row = table.insertRow();
        row.insertCell().textContent = statistics.statisticVariable;
        row.insertCell().textContent = statistics.median;
        row.insertCell().textContent = statistics.mean;
        row.insertCell().textContent = statistics.max;
        row.insertCell().textContent = statistics.min;

        // Legg til tabellen til div-elementet for resultatene
        resultsDiv.appendChild(table);
    } else {
        console.error("Results div element not found.");
    }
};



// Vis feilmelding til brukeren
const displayError = (message: string) => {
    // Opprett et element for å vise feilmeldingen
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = message;

    // Finn resultater-diven
    const resultsDiv = document.getElementById('results');

    // Sjekk om resultater-diven eksisterer før du legger til feilmeldingen
    if (resultsDiv) {
        // Legg til feilmeldingen som et barn av resultater-diven
        resultsDiv.innerHTML = ''; // Fjern eventuelle tidligere resultater
        resultsDiv.appendChild(errorElement);
    } else {
        // Hvis resultater-diven ikke eksisterer, kan du logge feilmeldingen til konsollen
        console.error('Failed to find resultsDiv element');
    }

    // Logg feilmeldingen til konsollen uansett
    console.error(message);
};

// Legg til hendelseslytter for skjemainnsending
document.getElementById("statisticsForm")?.addEventListener("submit", handleFormSubmit);
