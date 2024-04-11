# SSB-Statistic-calc
Henter data fra SSB sin API og legger ut i localhost:3000
Her er en mulig README-fil som forklarer hvordan prosjektet fungerer og hvordan man kan kjøre det:

---

# Statistikkportal med SSB-data

Dette prosjektet er en statistikkportal som henter data fra Statistisk sentralbyrå (SSB) sitt API og viser forskjellige statistiske beregninger basert på brukerens valg.

## Funksjoner

- **Henting av data**: Portalen lar brukeren velge ulike statistikkvariabler, regiontyper, regioner og år for å hente data fra SSB sitt API.
- **Visning av statistikk**: Etter å ha hentet dataen, viser portalen statistikk som median, gjennomsnitt, maksimum og minimum for de valgte variablene.
- **Feilhåndtering**: Portalen håndterer feil ved henting av data og visning av statistikk, og gir beskrivende feilmeldinger til brukeren.

## Teknologier

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js med Express.js
- **Datahenting**: Axios for HTTP-forespørsler til SSB sitt API
- **Statistikkberegning**: TypeScript

## Installasjon

1. Klon prosjektet fra GitHub:

   ```
   git clone https://github.com/brukernavn/prosjektnavn.git
   ```

2. Naviger til prosjektmappen:

   ```
   cd prosjektnavn
   ```

3. Installer nødvendige avhengigheter:

   ```
   npm install
   ```

## Kjøring

1. Start serveren:

   ```
   npm start
   ```

2. Åpne nettleseren og gå til [http://localhost:3000](http://localhost:3000) for å bruke statistikkportalen.

## Konfigurasjon

- **API-endepunkt**: Backend-serveren er konfigurert til å hente data fra SSB sitt API. Du kan endre API-endepunktet i `index.ts`-filen hvis nødvendig.

## Feilsøking

- **Feil ved henting av data**: Hvis det oppstår feil ved henting av data fra SSB sitt API, kan det skyldes ugyldige parametere eller problemer med tilkoblingen. Sjekk konsollen for feilmeldinger for å identifisere problemet.
- **Feil ved visning av statistikk**: Hvis det oppstår feil ved visning av statistikk, kan det skyldes problemer med dataformatet eller feil i statistikkberegningene. Sjekk konsollen for feilmeldinger fra både frontend og backend for å identifisere problemet.

---

Du kan også legge til instruksjoner for å legge til nye funksjoner eller gjøre endringer i koden, samt hvordan man kan bidra til prosjektet hvis det er åpent for bidrag fra andre utviklere.
