"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
// Importer nødvendige moduler
const axios_1 = __importDefault(require("axios"));
// Definer URL for API-endepunktet
const API_ENDPOINT = '/api/data';
// Deklarer variabler
let statisticVariable;
let regionType;
let regions;
let years;
// Definer en funksjon for å håndtere skjemainnsending
const handleFormSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Form submitted, handling data...');
    // Flytter variabelhentingen inn i funksjonen
    statisticVariable = document.getElementById("statisticVariable").value;
    regionType = document.getElementById("regionType").value;
    regions = document.getElementById("regions").value.split(",");
    years = [
        document.getElementById("year1").value,
        document.getElementById("year2").value,
        document.getElementById("year3").value
    ];
    console.log('Sending data to server:', { statisticVariable, regionType, regions, years });
    event.preventDefault(); // Hindre standard skjemainnsending
    try {
        // Send brukerens input til serveren
        const response = yield axios_1.default.post(API_ENDPOINT, { statisticVariable, regionType, regions, years }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Håndter mottatte data
        const statistics = response.data;
        updateUIWithStatistics(statistics);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        displayError('Failed to fetch data. Please try again later.');
    }
});
// Oppdater brukergrensesnittet med statistikkene
const updateUIWithStatistics = (statistics) => {
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
    }
    else {
        console.error("Results div element not found.");
    }
};
// Vis feilmelding til brukeren
const displayError = (message) => {
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
    }
    else {
        // Hvis resultater-diven ikke eksisterer, kan du logge feilmeldingen til konsollen
        console.error('Failed to find resultsDiv element');
    }
    // Logg feilmeldingen til konsollen uansett
    console.error(message);
};
// Legg til hendelseslytter for skjemainnsending
(_a = document.getElementById("statisticsForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleFormSubmit);
