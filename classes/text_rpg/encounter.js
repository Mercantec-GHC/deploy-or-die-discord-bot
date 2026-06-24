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
import ReverseProxy from "./Enemies/ReverseProxy.js";
import Nginx from "./Enemies/Nginx.js";
import Vps from "./Enemies/Vps.js";

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
            "forticlient": new Enemy("Forticlient", 444, 44, this, "Surely that is not just forty clients in a trench coat? roll for initiative!"),
            "notion": new Enemy("Notion", 500, 50, this, "A black book lays before you on a pedestal of green stone, it hums with a strange energy as you approach it, the moment your hand grasp the cover your mind is flooded with immesurable knowledge acompanied by a overwhelming pain, as the pain subsides you understand that knowledge and understanding are not always companions. roll for initiative!"),
            "unresponsive": new TaskManager(this),
            "task manager": new TaskManager(this),
            "deploy": new Enemy("The Great Deployer", 1500, 50, this, "In the middle of a horde of shambling creatures made of code, stands a cloaked figure, face hidden by a weird texture error as you look upon the creature, you are strangely drawn towards him almost as if you are being compelled by MAGS. roll for initiative!"),
            "virus": new Enemy("Virus", 500, 60, this, "As you traverse the tall grass a wild virus appeared, roll for initiative!"),
            "trojan": new Enemy("Trojan", 500, 50, this, "This program is probably totally normal, roll for initiative!"),
            "dns": new Enemy("DNS", 500, 50, this, "A sleek black obelisk looms before you, humming faintly with power. as you approach, it begins to pulse with an otherworldly energy. roll for initiative!"),
            "mercantec": new Mercantec(this),
            "discord bot": new Enemy("Discord Bot", 500, 50, this, "A helpful assistant that can perform various tasks and provide information within the Discord platform. roll for initiative!"),
            "canonicalization": new Enemy("Canonicalization", 420, 69, this, "A twisting mass of tangled paths, aliases, and rewritten names. Every route seems different, yet all inevitably lead back to the same destination. It delights in turning certainty into confusion, stripping away disguises and forcing all things into their true form. Beware - what enters as one thing may emerge as another. roll for initiative!"),
            "deploy or die": new Enemy("Deployer of Die", 1111, 42, this, "I think you might have misunderstood something. Roll for initiative!" ),
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