import Guild from "./classes/guild/guild_model.js";
import GuildCreateInterface from "./classes/guild/guild_create_interface.js";


let guild = new Guild(new GuildCreateInterface(1, "Test Guild"));
console.log(guild);
console.log("Hello world!");

console.log("test");