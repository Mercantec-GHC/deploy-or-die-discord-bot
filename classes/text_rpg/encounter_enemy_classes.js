
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

const enemy_classes = {
    "docker": [new Docker(this)],
    "reverse proxy": [new ReverseProxy(this)],  
    "spaghetti": [new SpaghettiCode(this)],
    "firewall": [new Firewall(this)],
    "osi": [new Osi(this)],
    "ip address": [new IpMacAddress(this)],
    "mac address": [new IpMacAddress(this)],
    "forward proxy": [new ForwardProxy(this)],
    "nginx": [new Nginx(this)],
    "vps": [new Vps(this)],
    "forticlient": [new FortiClient(this)],
    "notion": [new Notion(this)],
    "unresponsive": [new TaskManager(this)],
    "task manager": [new TaskManager(this)],
    "deploy": [new Deploy(this)],
    "virus": [new Virus(this)],
    "trojan": [new Trojan(this)],
    "dns": [new DNS(this)],
    "mercantec": [new Mercantec(this)],
    "discord bot": [new DiscordBot(this)],
    "canonicalization": [new Canonicalization(this)],
    "deploy or die": [new DeployOrDie(this)],
    "mega byte": [new MegaByte(this)],
    "mb": [new MegaByte(this)],
    "creep" : [new GreenPig(this)],
    "twingate" : [new Twingate(this)],
    "proxy" : [new ReverseProxy(this), new ForwardProxy(this)],
}

export default enemy_classes