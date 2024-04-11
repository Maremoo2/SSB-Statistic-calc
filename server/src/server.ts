// server.ts
import express, { Request, Response } from "express";
import path from "path"; // Import the 'path' module
import { fetchData } from "./dataFetcher";
import { calculateStatistics } from "./statisticsCalculator";

const app = express();
const PORT = 3000;

app.get("/favicon.ico", (req: Request, res: Response) => {
  res.status(204).send(); // Sender en 204 No Content-respons
});

app.use(express.json());

// Serve statiske filer fra klientens dist-mappen
app.use(express.static(path.join(__dirname, "../client/dist")));
console.log("__dirname:", __dirname);
console.log(
  "Resolved client/dist path:",
  path.join(__dirname, "../../client/dist")
);

// Endepunkt for å håndtere brukerens dataforespørsler
app.post("/api/data", async (req, res) => {
  try {
    // Hent ut nødvendig informasjon fra forespørselen
    const { statisticVariable, regionType, regions, years } = req.body;

    // Valider brukerens input
    if (
      !statisticVariable ||
      !regionType ||
      !regions ||
      !years ||
      years.length < 3
    ) {
      throw new Error("Invalid request parameters");
    }

    // Hent data fra ekstern kilde basert på brukerens input
    const data = await fetchData(statisticVariable, regionType, regions, years);

    // Beregn statistikk basert på dataene
    const statistics = calculateStatistics(data);

    // Logg mottatt data og sendte data tilbake til klienten
    console.log("Received request with data:", req.body);
    console.log("Sending data back to client:", statistics);

    // Send statistikk tilbake til klienten
    res.json(statistics);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// Logg innkommende forespørsler
app.use((req, res, next) => {
  console.log("Incoming request:", req.url);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/statistics.html"));
});

// Lytt på angitt port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
