import Player from "./player.js";
import Dice from "./dice.js";
import Enemy from "./Enemies/enemy.js";

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

export default class Encounter {

        static encounter_chance = 10; // percentage
        static max_missed_encounters = 2;
        static missed_encounters = 0;
        static timeout_duration =  1; // minutes
        static leave_timeout_duration = 15; // minutes

    /**
     * @param {string} keyword
     * @param {import("../channel/channel_model.js").default} channel
     */
    constructor(keyword, channel) {
        this.keyword = keyword;
        /** @type {import("../channel/channel_model.js").default} */
        this.channel = channel;
        /** @type {boolean} */
        this.is_encountered = Encounter.calculate_chance();
        /** @type {Enemy | null} */
        this.enemy = this.encounter_enemy(keyword);

        /** @type {Map<string, Player>} */
        this.players = new Map();

        /** @type {string[]} */
        this.messages_to_send = [];
    }
    
        
    /**
     * Rolls encounter chance with pity logic after missed attempts.
     * @returns {boolean}
     */
    static calculate_chance() {
        let is_encountered = Math.random() * 100 < this.encounter_chance;
        if (!is_encountered) {
            this.missed_encounters++;
            if (this.missed_encounters >= this.max_missed_encounters) {
                this.missed_encounters = 0;
                return true
            }
        }
        else {
            this.missed_encounters = 0;
        }
        return is_encountered;
    }

    /**
     * Returns an enemy instance based on the encounter keyword, or undefined if no match.
     * @param {string} keyword
     * @returns {Enemy | undefined}
     */
    encounter_enemy(keyword) {

        // CHECK ON ALL KEYWORDS FOR ENEMIES

        return {
            "docker": new Docker(this),
            "reverse proxy": new ReverseProxy(this),  
            "spaghetti": new SpaghettiCode(this),
            "firewall": new Firewall(this),
            "osi": new Osi(this),
            "ip address": new IpMacAddress(this),
            "mac address": new IpMacAddress(this),
            "forward proxy": new ForwardProxy(this),
            "nginx": new Nginx(this),
            "vps": new Vps(this),
            "forticlient": new FortiClient(this),
            "notion": new Notion(this),
            "unresponsive": new TaskManager(this),
            "task manager": new TaskManager(this),
            "deploy": new Deploy(this),
            "virus": new Virus(this),
            "trojan": new Trojan(this),
            "dns": new DNS(this),
            "mercantec": new Mercantec(this),
            "discord bot": new DiscordBot(this),
            "canonicalization": new Canonicalization(this),
            "deploy or die": new DeployOrDie(this),
            "mega byte": new MegaByte(this),
            "mb": new MegaByte(this),
            "creep" : new GreenPig(this),
            "twingate" : new Twingate(this),
        }[keyword]

    }

    /**
     * Applies a player attack to the current enemy and posts combat messages.
     * @param {import("./attack.js").default} attack
     * @param {Player} player
     * @returns {Promise<void>}
     */
    async attack_enemy(attack, player) {
        if(this.is_encountered && this.enemy) {
            player.attack(this.enemy, attack);
            
            let whole_message = this.messages_to_send.join("\n");
            this.messages_to_send = [];

            await this.channel.reply_to_last_message(whole_message);

            if (!this.enemy.is_alive) {
                this.game_end("You win!")
            }
        }
    }

    /**
     * Adds a member as a combat player in this encounter.
     * @param {import("../member/member_model.js").default} member
     * @returns {Promise<void>}
     */
    add_player(member) {
        let player = new Player(member.name, 500, this);

        console.log(member.id, member.name)
        this.players.set(member.id, player);

        let join_messages = [
            `[ ${player.name} ] went online! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] plugged in their controller! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] initialized their system! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] played the windows boot up sound! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] is ready to deploy! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] connected successfully! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] joined the network! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] authenticated their credentials! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] has entered the chat... menacingly. ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] successfully passed the CAPTCHA! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] left the tutorial area. Good luck. ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] chose their starter Pokémon! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] is challenged by Youngster Joey! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] installed 37 mods and somehow launched successfully! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] would like to battle! ( ${player.hp} Available Memory )`,
            `[ ${player.name} ] connected via SSH. ( ${player.hp} Available Memory )`,
        ]

        let join_dice = new Dice(join_messages.length);

        this.messages_to_send.push(join_messages[join_dice.roll() - 1]);
    }

    game_end(message) {
        this.channel.send_message(`# ${message}`);
        this.channel.encounter = null;
    }

}