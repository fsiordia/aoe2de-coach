export const fastCastle = [
    { id: 1, text: "Queue as many villagers as possible in TC", note: "Maintain villager production constantly", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "2 Villagers build one House", note: "Then send them to sheep", distribution: { food: 5, wood: 0, gold: 0, stone: 0, total: 5 } },
    { id: 3, text: "1 Villager builds another House", note: "Then send to sheep", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 4, text: "6 Villagers on Sheep", note: "Harvest sheep under the TC", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 5, text: "4 Villagers on Wood", note: "Build a Lumber Camp", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 6, text: "1 Villager lures Boar", note: "Research Loom locally if needed", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 7, text: "1 Villager builds House near berries", note: "Then builds Mill", distribution: { food: 8, wood: 4, gold: 0, stone: 0, total: 12 } },
    { id: 8, text: "3 Villagers on Berries", note: "For a total of 4 on berries", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 9, text: "1 Villager lures second Boar", note: "Timing is crucial", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 10, text: "2 Villagers on Boar/Food under TC", note: "Maintain 6-8 food gatherers", distribution: { food: 14, wood: 4, gold: 0, stone: 0, total: 18 } },
    { id: 11, text: "3 Villagers on Wood (2nd Lumber Camp)", note: "Total 7 on wood", distribution: { food: 14, wood: 7, gold: 0, stone: 0, total: 21 } },
    { id: 12, text: "Research Feudal Age", note: "Requires 500 Food. Pop: 26-28. (Add'l vills to food/gold)", distribution: { food: 17, wood: 8, gold: 2, stone: 0, total: 27 } },
    { id: 13, text: "While advancing: Move 4 food villagers to Wood", note: "Prepare for market/blacksmith", distribution: { food: 13, wood: 12, gold: 2, stone: 0, total: 27 } },
    { id: 14, text: "Arrive Feudal Age: Queue 2 Villagers", note: "", distribution: { food: 13, wood: 12, gold: 2, stone: 0, total: 29 } },
    { id: 15, text: "Build Market and Blacksmith", note: "Requires 175 Wood + 150 Wood", distribution: { food: 13, wood: 10, gold: 2, stone: 0, total: 29 } },
    { id: 16, text: "Research Castle Age", note: "Requires 800 Food, 200 Gold", distribution: { food: 13, wood: 10, gold: 2, stone: 0, total: 29 } },
    { id: 17, text: "Castle Age Researching!", note: "You made it! Plan your military transition.", distribution: { food: 13, wood: 10, gold: 2, stone: 0, total: 29 } }
];

export const baidotFastCastle = [
    { id: 1, text: "Queue Villagers in TC", note: "Maintain production. Start with 3 on Food (Sheep).", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "1 Villager builds House", note: "Then send to Food. (Pop 4/10)", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 4 } },
    { id: 3, text: "Next 2 Villagers to Food", note: "Target: 5 on Food (Hunt/Sheep).", distribution: { food: 5, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 4, text: "Next 5 Villagers on Wood", note: "Build Lumber Camp first. (Pop 11).", distribution: { food: 5, wood: 5, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "Build House", note: "Use a Wood villager briefly if needed. Prevent supply block.", distribution: { food: 5, wood: 5, gold: 0, stone: 0, total: 11 } },
    { id: 6, text: "Next 7 Villagers to Food", note: "Target: 12 on Food. Build Mill during this phase.", distribution: { food: 12, wood: 5, gold: 0, stone: 0, total: 18 } },
    { id: 7, text: "Build House & Mill", note: "Ensure housing for up to 25 pop.", distribution: { food: 12, wood: 5, gold: 0, stone: 0, total: 18 } },
    { id: 8, text: "Next 7 Villagers to Wood", note: "Target: 12 on Wood. Build 2nd Lumber Camp if efficient.", distribution: { food: 12, wood: 12, gold: 0, stone: 0, total: 25 } },
    { id: 9, text: "Build Houses", note: "Ensure housing for 30+ pop.", distribution: { food: 12, wood: 12, gold: 0, stone: 0, total: 25 } },
    { id: 10, text: "Next 5 Villagers to Gold", note: "Build Mining Camp. Target: 5 on Gold.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 11, text: "Research Feudal Age", note: "You should have ~30 Villagers.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 12, text: "Build Barracks", note: "Use a builder (from Wood/Food) while advancing.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 13, text: "Arrive Feudal: Build Blacksmith & Stable", note: "Queue Stable immediately.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 14, text: "Research Castle Age", note: "Requires 800 Food, 200 Gold.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 15, text: "Research Upgrades", note: "Wood (Double-Bit Axe), Food (Horse Collar), Gold (Mining), Blacksmith (Atk/Def)", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 16, text: "Arrive Castle: Mass Knights", note: "Chingos de caballos!", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } }
];

export const scoutRush = [
    { id: 1, text: "Queue Villagers in TC constantly", note: "First 2 Villagers build a House each, then to sheep.", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "6 Villagers on Sheep", note: "Eat sheep under the TC, one at a time.", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 3, text: "4 Villagers on Wood", note: "Build a Lumber Camp on a good treeline.", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 4, text: "1 Villager lures Boar", note: "Shoot it twice, run back to TC.", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "1 Villager builds House + Mill on Berries", note: "3 more join on berries (4 total).", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 6, text: "1 Villager lures second Boar", note: "Keep 6-8 on food under TC.", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 7, text: "3 more Villagers on Wood", note: "Total 7 on wood.", distribution: { food: 13, wood: 7, gold: 0, stone: 0, total: 20 } },
    { id: 8, text: "Research Loom, click Feudal Age at 21 pop", note: "Requires 500 Food.", distribution: { food: 13, wood: 7, gold: 0, stone: 0, total: 20 } },
    { id: 9, text: "While advancing: build Barracks", note: "Use a wood Villager. Move 3 food vills to wood.", distribution: { food: 10, wood: 10, gold: 0, stone: 0, total: 20 } },
    { id: 10, text: "Arrive Feudal: build Stable, queue Scouts", note: "Non-stop Scout production. Keep making Villagers.", distribution: { food: 10, wood: 10, gold: 0, stone: 0, total: 21 } },
    { id: 11, text: "Attack with first 3-4 Scouts", note: "Hunt Villagers on wood/gold. Avoid the TC and Spearmen!", distribution: { food: 11, wood: 10, gold: 0, stone: 0, total: 22 } },
    { id: 12, text: "Add a second wave of Scouts + Bloodlines", note: "If food allows. New vills to food/wood.", distribution: { food: 13, wood: 11, gold: 0, stone: 0, total: 25 } },
    { id: 13, text: "Wall your base while raiding", note: "Their counterattack comes with Archers or Spears.", distribution: { food: 13, wood: 12, gold: 0, stone: 0, total: 26 } },
    { id: 14, text: "Add Gold miners, plan Castle Age", note: "Transition into Knights or your civ's power unit.", distribution: { food: 14, wood: 12, gold: 4, stone: 0, total: 30 } }
];

export const archerRush = [
    { id: 1, text: "Queue Villagers in TC constantly", note: "First 2 Villagers build a House each, then to sheep.", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "6 Villagers on Sheep", note: "Eat sheep under the TC.", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 3, text: "4 Villagers on Wood", note: "Build a Lumber Camp.", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 4, text: "1 Villager lures Boar", note: "Then stays on food under TC.", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "1 Villager builds House + Mill on Berries", note: "3 more join (4 on berries).", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 6, text: "1 Villager lures second Boar", note: "Keep eating boars under the TC.", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 7, text: "5 more Villagers on Wood", note: "Total 9-10 on wood. 2nd Lumber Camp if needed.", distribution: { food: 12, wood: 9, gold: 0, stone: 0, total: 21 } },
    { id: 8, text: "1 Villager builds Barracks", note: "At ~60% to Feudal Age.", distribution: { food: 12, wood: 9, gold: 0, stone: 0, total: 22 } },
    { id: 9, text: "Research Loom, click Feudal at 22 pop", note: "Requires 500 Food.", distribution: { food: 12, wood: 9, gold: 0, stone: 0, total: 22 } },
    { id: 10, text: "While advancing: 2 Villagers to Gold", note: "Build a Mining Camp.", distribution: { food: 10, wood: 9, gold: 2, stone: 0, total: 22 } },
    { id: 11, text: "Arrive Feudal: build 2 Archery Ranges", note: "Non-stop Archer production from both.", distribution: { food: 10, wood: 9, gold: 3, stone: 0, total: 23 } },
    { id: 12, text: "Research Double-Bit Axe & Fletching", note: "Fletching before your first fight.", distribution: { food: 10, wood: 10, gold: 4, stone: 0, total: 25 } },
    { id: 13, text: "Attack with 8-10 Archers", note: "Focus Villagers, dodge Skirmishers, micro back from Scouts.", distribution: { food: 11, wood: 10, gold: 5, stone: 0, total: 27 } },
    { id: 14, text: "Keep producing, wall your base", note: "Add Skirms if they mirror Archers. Plan Crossbow timing in Castle.", distribution: { food: 12, wood: 11, gold: 5, stone: 0, total: 29 } }
];

export const drushFastCastle = [
    { id: 1, text: "Queue Villagers in TC constantly", note: "First 2 Villagers build a House each, then to sheep.", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "6 Villagers on Sheep", note: "Eat sheep under the TC.", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 3, text: "4 Villagers on Wood", note: "Build a Lumber Camp.", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 4, text: "1 Villager lures Boar, research Loom", note: "Loom protects your drushing Villagers later.", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "1 Villager builds House + Mill on Berries", note: "3 more join (4 on berries).", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 6, text: "1 Villager builds Barracks at ~19 pop", note: "Hide it in trees near mid-map if you're feeling spicy.", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 7, text: "1 Villager lures second Boar", note: "Keep TC food going.", distribution: { food: 13, wood: 4, gold: 0, stone: 0, total: 17 } },
    { id: 8, text: "Train 3 Militia, send them to enemy eco", note: "Harass Villagers on wood/berries. Don't fight the TC.", distribution: { food: 13, wood: 5, gold: 0, stone: 0, total: 18 } },
    { id: 9, text: "3 more Villagers on Wood", note: "Total 7-8 on wood.", distribution: { food: 13, wood: 8, gold: 0, stone: 0, total: 21 } },
    { id: 10, text: "2 Villagers on Gold", note: "Mining Camp. Militia keep dancing in their eco.", distribution: { food: 14, wood: 8, gold: 2, stone: 0, total: 24 } },
    { id: 11, text: "Click Feudal Age at ~27 pop", note: "Your drush bought you the time to boom safely.", distribution: { food: 16, wood: 9, gold: 2, stone: 0, total: 27 } },
    { id: 12, text: "While advancing: wall your base", note: "Use wood Villagers for palisades between forests.", distribution: { food: 13, wood: 12, gold: 2, stone: 0, total: 27 } },
    { id: 13, text: "Arrive Feudal: Market + Blacksmith", note: "175 + 150 Wood. Keep making Villagers.", distribution: { food: 13, wood: 10, gold: 4, stone: 0, total: 29 } },
    { id: 14, text: "Research Castle Age", note: "800 Food, 200 Gold.", distribution: { food: 14, wood: 10, gold: 4, stone: 0, total: 30 } },
    { id: 15, text: "Arrive Castle: pick your power unit", note: "Knights, Crossbows or your unique unit. You're ahead — use it.", distribution: { food: 14, wood: 10, gold: 6, stone: 0, total: 32 } }
];

/**
 * Catalog of build orders with matchup metadata.
 * - civBias: archetypes of YOUR civ that make this build shine.
 * - vsBias: archetypes of the ENEMY civ this build punishes or answers well.
 * - risk: rough guide shown in the UI.
 */
export const buildOrders = [
    {
        id: 'standard',
        name: 'Standard Fast Castle',
        summary: 'Safe economic opening into Castle Age power units.',
        risk: 'Low',
        civBias: ['cavalry', 'monk', 'siege', 'elephant', 'camel', 'defensive'],
        vsBias: ['infantry', 'monk', 'siege', 'defensive', 'naval'],
        steps: fastCastle,
    },
    {
        id: 'baidot',
        name: 'Baidot Fast Castle',
        summary: 'Simplified Fast Castle into mass Knights.',
        risk: 'Low',
        civBias: ['cavalry', 'camel', 'elephant'],
        vsBias: ['archer', 'siege', 'monk', 'naval'],
        steps: baidotFastCastle,
    },
    {
        id: 'scout_rush',
        name: 'Scout Rush (21 pop)',
        summary: 'Feudal aggression with Scouts to punish greedy openings.',
        risk: 'Medium',
        civBias: ['cavalry', 'cavalry_archer', 'camel'],
        vsBias: ['archer', 'gunpowder', 'monk', 'siege', 'defensive'],
        steps: scoutRush,
    },
    {
        id: 'archer_rush',
        name: 'Archer Rush (22 pop)',
        summary: 'Classic Feudal Archer pressure into Crossbow timing.',
        risk: 'Medium',
        civBias: ['archer', 'eagle', 'gunpowder'],
        vsBias: ['infantry', 'eagle', 'monk', 'elephant', 'siege'],
        steps: archerRush,
    },
    {
        id: 'drush_fc',
        name: 'Drush → Fast Castle',
        summary: 'Dark Age Militia harass buying time for a safe Fast Castle.',
        risk: 'Medium',
        civBias: ['infantry', 'eagle', 'monk', 'siege'],
        vsBias: ['archer', 'defensive', 'cavalry_archer', 'naval'],
        steps: drushFastCastle,
    },
];

export function getBuildOrderById(id) {
    return buildOrders.find(b => b.id === id);
}
