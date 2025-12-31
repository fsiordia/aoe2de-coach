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
