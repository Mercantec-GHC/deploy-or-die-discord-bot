import { api_url } from "./discord_constants.js";
import DiscordGateway from "./classes/discord_gateway/discord_gateway_model.js";
import express from "express";

const http_server = express();
let gateway;




http_server.get("/", (req, res) => {
    res.send("hello world");
    
});

http_server.get("/bot/start", (req, res) => {
    gateway.start();
    res.sendStatus(204);
});

http_server.get("/bot/stop", (req, res) => {
    gateway.stop();
    res.sendStatus(204);
});


fetch(new URL(api_url + "/gateway/bot"), {
    method: "GET",
    headers: {
        "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`
    }
}).then(response => response.json())
.then(data => {
    console.log("Data:", data);
    gateway = new DiscordGateway(data.url, process.env.DISCORD_BOT_TOKEN);
    gateway.start();

}).catch(error => {
    console.error("Error fetching gateway URL: ", error);
});

http_server.listen(3000, () => {
    console.log("Starting application...");


});

