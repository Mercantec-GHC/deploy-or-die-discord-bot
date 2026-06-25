# Deployment-projekt

## Forbindelse til Mercantecs netværk - Rene

### FortiClient

Vi anvendte FortiClient til at oprette forbindelse til Mercantecs netværk, så vi kunne få adgang til de nødvendige ressourcer under projektet.

---

## Opsætning af VPS (Virtual Private Server)

Vi oprettede vores virtuelle server via hjemmesiden **http://10.132.128.21**, som automatisk konfigurerede de grundlæggende indstillinger.

**Opsatte elementer:**

* Root-bruger
* SSH-adgang

---

## Docker

Vi installerede Docker tidligt i projektet for at sikre en ensartet og nem installation af vores services, herunder Twingate.

---

## Twingate - Rene

Vi anvendte Twingate VPN til at oprette en sikker forbindelse mellem vores enheder og VPS'en.

---

# Grundlæggende sikkerhed - Mads

## Brugere

Vi oprettede individuelle brugerkonti med adgangskoder. Senere implementerede vi SSH-nøgler (private/public keys), så vi kunne logge ind uden at skulle indtaste adgangskode hver gang.

**Sikkerhedstiltag:**

* Individuelle brugerkonti
* SSH-nøglebaseret login
* Deaktiveret login som root-bruger

---

## Firewall - Mads

Vi konfigurerede serverens firewall til kun at tillade nødvendige forbindelser.

**Åbne porte:**

* Port 22 (SSH)
* Port 80 (HTTP)
* Port 443 (HTTPS)

Alle andre indgående forbindelser er blokeret, mens udgående forbindelser er tilladt.

---

## Nginx - Rene

Vi anvendte Nginx som webserver til at hoste vores hjemmeside og håndtere webtrafik.

---

## Cloudflare Tunnel og domæne - Kasper

### Domæneopsætning

Vi tilknyttede et privat domæne, som vi allerede havde adgang til, til Cloudflare og konfigurerede DNS-records til at pege på vores Cloudflare Tunnel.

### Cloudflare Tunnel

For at gøre hjemmesiden tilgængelig udefra anvendte vi Cloudflare Tunnel, som skaber en sikker forbindelse mellem internettet og vores server.

---

## Upload af projekt til serveren - Kasper

Vi brugte projektets Git-repository til at overføre og opdatere projektfiler på VPS'en.

---

# Discord Bot-projekt

## Teknologier

* Node.js
* Express.js

## Projektbeskrivelse

Projektet består af en Discord-bot, hvis primære funktion er et tekstbaseret RPG-spil med multiplayer-funktionalitet, hvor flere brugere kan interagere med hinanden gennem Discord.

---

# Docker Compose - Kasper

Vi anvendte Docker Compose til nemt at deploye og administrere alle vores applikationer.

**Services inkluderet:**

* Nginx
* Cloudflared
* Discord-bot-projektet

---

# Docker-netværk

## Netværkskonfiguration - Mads

For at oprette en fungerende tunnel til vores hjemmeside blev både Nginx og Cloudflared konfigureret til at bruge serverens host-netværk. Dette betyder, at de deler IP-adresse med VPS'en.

Discord-botten kører derimod på sit eget bridge-netværk, hvilket giver bedre adskillelse mellem tjenesterne.

---

# Konklusion

Projektet demonstrerer en komplet deployment-proces, hvor vi har opsat en sikker VPS, implementeret netværks- og sikkerhedsløsninger, konfigureret webhosting og deployet både en hjemmeside og en Discord-bot ved hjælp af moderne containerteknologier.
