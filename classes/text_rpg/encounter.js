import Player from "./player.js";
import Enemy from "./Enemies/enemy.js";

import Docker from "./Enemies/Docker.js"
import IpMacAddress from "./Enemies/IpMacAddress.js"
import TaskManager from "./Enemies/TaskManager.js"

export default class Encounter {

        static encounter_chance = 10; // percentage
        static max_missed_encounters = 2;
        static missed_encounters = 0;
        static timeout_duration =  1; // minutes

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
            "reverse proxy": new Enemy("Reverse Proxy", 1700, 20, this, "A towering construct of mirrors and shifting data streams manifest before you, reflecting your truest of nature back at you. what a horrifying revalation roll for initiative!]"),  
            "spaghetti": new Enemy("Spaghetti Code", 30, 300, this, "you spot a monster seemingly made entirely of spaghetti, suddenly you get entangled in a mess of code as it tries to consume you. Roll for initiative!"),
            "firewall": new Enemy("Fire Wall", 500, 50, this, "you feel the heat before you spot it - a towering wall of bright flames. as you approach is start to notice the screams of unseen creatures trapped outside. roll for initiative!"),
            "osi": new Enemy("OSI", 500, 50, this, "As you desend the layers of the network you lose your way, suddenly you get grabbed by a giant hand, it starts to encode you. roll for initiative!"),
            "ip address": new IpMacAddress(this),
            "mac address": new IpMacAddress(this),
            "forward proxy": new Enemy("Forward Proxy", 500, 50, this, "floating in the air you see a construct of glass and steel, jagged edges and sheer planes inside it seemingly a black void, the being feels weirdly familiar. roll for initiative!"),
            "nginx": new Enemy("Nginx", 500, 50, this, "the moment you lay your eyes on this creature your brain immidiately starts screaming warnings at you - it filles you with a primordial dread the being that was not suppose to be, the unborn, the lord of the void. roll for initiative!"),
            "vps": new Enemy("VPS", 500, 50, this, "you spot the creature to late it is already upon you, a miniscule compared to others you have faced its form transparent and lite, its face contorted in a myriad of expressinons fear, pain, pleasure, joy all incompasing it lurches at you with a haunting wail. roll for initiative!"),
            "forticlient": new Enemy("Forticlient", 500, 50, this, ""),
            "notion": new Enemy("Notion", 500, 50, this, "a black book lays before you on a pedestal of green stone, it hums with a strange energy as you approach it, the moment your hand grasp the cover your mind is flooded with immesurable knowledge acompanied by a overwhelming pain, as the pain subsides you understand that knowledge and understanding are not always companions. roll for initiative!"),
            "unresponsive": new TaskManager(this),
            "task manager": new TaskManager(this),
            "deploy": new Enemy("the great Deployer", 500, 50, this, "in the middle of a horde of shambling creatures made of code, stands a cloaked figure, face hidden by a weird texture error as you look upon the creature, you are strangely drawn towards him almost as if you are being compelled by MAGS. roll for initiative!"),
            "virus": new Enemy("Virus", 500, 50, this, "as you traverse the tall grass a wild virus appeared, roll for initiative!"),
            "trojan": new Enemy("Trojan", 500, 50, this, "this program is probably totally normal, roll for initiative!"),
            "dns": new Enemy("DNS", 500, 50, this, "a sleek black obelisk looms before you, humming faintly with power. as you approach, it begins to pulse with an otherworldly energy. roll for initiative!"),
            "mercantec": new Enemy("Mercantec", 500, 50, this, "A legendary institution where students battle ancient foes such as Deadlines, Group Projects, and Documentation. Its workshops are filled with strange machines, while its computer labs glow long into the night. Those who survive its trials emerge armed with practical skills and an unhealthy relationship with caffeine. roll for initiative!"),
            "discord bot": new Enemy("Discord Bot", 500, 50, this, "a helpful assistant that can perform various tasks and provide information within the Discord platform. roll for initiative!"),
            "canonicalization": new Enemy("Canonicalization", 500, 50, this, "A twisting mass of tangled paths, aliases, and rewritten names. Every route seems different, yet all inevitably lead back to the same destination. It delights in turning certainty into confusion, stripping away disguises and forcing all things into their true form. Beware - what enters as one thing may emerge as another. roll for initiative!"),
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

        this.messages_to_send.push(`[ ${player.name} ] has joined the battle! ( ${player.hp} HP )`);
    }

    game_end(message) {
        this.channel.send_message(`# ${message}`);
        this.channel.encounter = null;
    }

}