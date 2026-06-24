
import ForwardProxy from "./Enemies/ForwardProxy.js";
import Osi from "./Enemies/Osi.js";
import Firewall from "./Enemies/Firewall.js"
import SpaghettiCode from "./Enemies/SpaghettiCode.js"
import Twingate from "./Enemies/Twingate.js";
import Mercantec from "./Enemies/Mercantec.js";
import Docker from "./Enemies/Docker.js"
import IpMacAddress from "./Enemies/IpMacAddress.js"
import TaskManager from "./Enemies/TaskManager.js"
import MegaByte from "./Enemies/MegaByte.js";
import GreenPig from "./Enemies/GreenPig.js";
import Deploy from "./Enemies/Deploy.js";
import Virus from "./Enemies/Virus.js";
import Trojan from "./Enemies/Trojan.js";
import DNS from "./Enemies/DNS.js";
import DiscordBot from "./Enemies/DiscordBot.js";
import Canonicalization from "./Enemies/Canonicalization.js";
import DeployOrDie from "./Enemies/DeployOrDie.js";
import ReverseProxy from "./Enemies/ReverseProxy.js";
import Nginx from "./Enemies/Nginx.js";
import Vps from "./Enemies/Vps.js";
import FortiClient from "./Enemies/FortiClient.js";
import Notion from "./Enemies/Notion.js";

function getEnemyEncounter(keyword, encounter) {
    return {
        "docker": [new Docker(encounter)],
        "reverse proxy": [new ReverseProxy(encounter)],  
        "spaghetti": [new SpaghettiCode(encounter)],
        "firewall": [new Firewall(encounter)],
        "osi": [new Osi(encounter)],
        "ip address": [new IpMacAddress(encounter)],
        "mac address": [new IpMacAddress(encounter)],
        "forward proxy": [new ForwardProxy(encounter)],
        "nginx": [new Nginx(encounter)],
        "vps": [new Vps(encounter)],
        "forticlient": [new FortiClient(encounter)],
        "notion": [new Notion(encounter)],
        "unresponsive": [new TaskManager(encounter)],
        "task manager": [new TaskManager(encounter)],
        "deploy": [new Deploy(encounter)],
        "virus": [new Virus(encounter)],
        "trojan": [new Trojan(encounter)],
        "dns": [new DNS(encounter)],
        "mercantec": [new Mercantec(encounter)],
        "discord bot": [new DiscordBot(encounter)],
        "canonicalization": [new Canonicalization(encounter)],
        "deploy or die": [new DeployOrDie(encounter)],
        "mega byte": [new MegaByte(encounter)],
        "mb": [new MegaByte(encounter)],
        "creep" : [new GreenPig(encounter)],
        "twingate" : [new Twingate(encounter)],
        "proxy" : [new ReverseProxy(encounter), new ForwardProxy(encounter)],
    }[keyword]
}

export default getEnemyEncounter