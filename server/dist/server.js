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
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path")); // Import the 'path' module
const dataFetcher_1 = require("./dataFetcher");
const statisticsCalculator_1 = require("./statisticsCalculator");
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/favicon.ico', (req, res) => {
    res.status(204).send(); // Sender en 204 No Content-respons
});
app.use(express_1.default.json());
// Serve statiske filer fra klientens dist-mappen
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
console.log("__dirname:", __dirname);
console.log("Resolved client/dist path:", path_1.default.join(__dirname, '../../client/dist'));
// Endepunkt for å håndtere brukerens dataforespørsler
app.post('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hent ut nødvendig informasjon fra forespørselen
        const { statisticVariable, regionType, regions, years } = req.body;
        // Valider brukerens input
        if (!statisticVariable || !regionType || !regions || !years || years.length < 3) {
            throw new Error('Invalid request parameters');
        }
        // Hent data fra ekstern kilde basert på brukerens input
        const data = yield (0, dataFetcher_1.fetchData)(statisticVariable, regionType, regions, years);
        // Beregn statistikk basert på dataene
        const statistics = (0, statisticsCalculator_1.calculateStatistics)(data);
        // Logg mottatt data og sendte data tilbake til klienten
        console.log('Received request with data:', req.body);
        console.log('Sending data back to client:', statistics);
        // Send statistikk tilbake til klienten
        res.json(statistics);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
}));
// Logg innkommende forespørsler
app.use((req, res, next) => {
    console.log("Incoming request:", req.url);
    next();
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/statistics.html'));
});
// Lytt på angitt port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
