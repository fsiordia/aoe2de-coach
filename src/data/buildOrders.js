export const fastCastle = [
    { id: 1, text: "Queue as many villagers as possible in TC", textEs: "Encola todos los aldeanos posibles en el TC", note: "Maintain villager production constantly", noteEs: "Mantén la producción de aldeanos constante", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "2 Villagers build one House", textEs: "2 aldeanos construyen una casa", note: "Then send them to sheep", noteEs: "Luego mándalos a las ovejas", distribution: { food: 5, wood: 0, gold: 0, stone: 0, total: 5 } },
    { id: 3, text: "1 Villager builds another House", textEs: "1 aldeano construye otra casa", note: "Then send to sheep", noteEs: "Luego mándalo a las ovejas", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 4, text: "6 Villagers on Sheep", textEs: "6 aldeanos en ovejas", note: "Harvest sheep under the TC", noteEs: "Come las ovejas bajo el TC", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 5, text: "4 Villagers on Wood", textEs: "4 aldeanos a madera", note: "Build a Lumber Camp", noteEs: "Construye un campamento maderero", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 6, text: "1 Villager lures Boar", textEs: "1 aldeano jala el jabalí", note: "Research Loom locally if needed", noteEs: "Investiga Telar si hace falta", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 7, text: "1 Villager builds House near berries", textEs: "1 aldeano construye casa junto a las bayas", note: "Then builds Mill", noteEs: "Luego construye el molino", distribution: { food: 8, wood: 4, gold: 0, stone: 0, total: 12 } },
    { id: 8, text: "3 Villagers on Berries", textEs: "3 aldeanos a bayas", note: "For a total of 4 on berries", noteEs: "Para un total de 4 en bayas", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 9, text: "1 Villager lures second Boar", textEs: "1 aldeano jala el segundo jabalí", note: "Timing is crucial", noteEs: "El timing es crucial", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 10, text: "2 Villagers on Boar/Food under TC", textEs: "2 aldeanos a jabalí/comida bajo el TC", note: "Maintain 6-8 food gatherers", noteEs: "Mantén 6-8 en comida", distribution: { food: 14, wood: 4, gold: 0, stone: 0, total: 18 } },
    { id: 11, text: "3 Villagers on Wood (2nd Lumber Camp)", textEs: "3 aldeanos a madera (2º campamento)", note: "Total 7 on wood", noteEs: "Total 7 en madera", distribution: { food: 14, wood: 7, gold: 0, stone: 0, total: 21 } },
    { id: 12, text: "Research Feudal Age", textEs: "Investiga Edad Feudal", note: "Requires 500 Food. Pop: 26-28. (Add'l vills to food/gold)", noteEs: "Requiere 500 de comida. Pop: 26-28. (Aldeanos extra a comida/oro)", distribution: { food: 17, wood: 8, gold: 2, stone: 0, total: 27 } },
    { id: 13, text: "While advancing: Move 4 food villagers to Wood", textEs: "Mientras avanzas: mueve 4 aldeanos de comida a madera", note: "Prepare for market/blacksmith", noteEs: "Prepara mercado y herrería", distribution: { food: 13, wood: 12, gold: 2, stone: 0, total: 27 } },
    { id: 14, text: "Arrive Feudal Age: Queue 2 Villagers", textEs: "Llegas a Feudal: encola 2 aldeanos", note: "", noteEs: "", distribution: { food: 13, wood: 12, gold: 2, stone: 0, total: 29 } },
    { id: 15, text: "Build Market and Blacksmith", textEs: "Construye mercado y herrería", note: "Requires 175 Wood + 150 Wood", noteEs: "Requiere 175 + 150 de madera", distribution: { food: 13, wood: 10, gold: 2, stone: 0, total: 29 } },
    { id: 16, text: "Research Castle Age", textEs: "Investiga Edad de los Castillos", note: "Requires 800 Food, 200 Gold", noteEs: "Requiere 800 de comida y 200 de oro", distribution: { food: 13, wood: 10, gold: 2, stone: 0, total: 29 } },
    { id: 17, text: "Castle Age Researching!", textEs: "¡Investigando Castillos!", note: "You made it! Plan your military transition.", noteEs: "¡Lo lograste! Planea tu transición militar.", distribution: { food: 13, wood: 10, gold: 2, stone: 0, total: 29 } }
];

export const baidotFastCastle = [
    { id: 1, text: "Queue Villagers in TC", textEs: "Encola aldeanos en el TC", note: "Maintain production. Start with 3 on Food (Sheep).", noteEs: "Mantén la producción. Empieza con 3 en comida (ovejas).", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "1 Villager builds House", textEs: "1 aldeano construye casa", note: "Then send to Food. (Pop 4/10)", noteEs: "Luego a comida. (Pop 4/10)", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 4 } },
    { id: 3, text: "Next 2 Villagers to Food", textEs: "Siguientes 2 aldeanos a comida", note: "Target: 5 on Food (Hunt/Sheep).", noteEs: "Meta: 5 en comida (caza/ovejas).", distribution: { food: 5, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 4, text: "Next 5 Villagers on Wood", textEs: "Siguientes 5 aldeanos a madera", note: "Build Lumber Camp first. (Pop 11).", noteEs: "Construye el campamento maderero primero. (Pop 11)", distribution: { food: 5, wood: 5, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "Build House", textEs: "Construye casa", note: "Use a Wood villager briefly if needed. Prevent supply block.", noteEs: "Usa un aldeano de madera si hace falta. Evita el bloqueo de población.", distribution: { food: 5, wood: 5, gold: 0, stone: 0, total: 11 } },
    { id: 6, text: "Next 7 Villagers to Food", textEs: "Siguientes 7 aldeanos a comida", note: "Target: 12 on Food. Build Mill during this phase.", noteEs: "Meta: 12 en comida. Construye el molino en esta fase.", distribution: { food: 12, wood: 5, gold: 0, stone: 0, total: 18 } },
    { id: 7, text: "Build House & Mill", textEs: "Construye casa y molino", note: "Ensure housing for up to 25 pop.", noteEs: "Asegura casas para 25 de población.", distribution: { food: 12, wood: 5, gold: 0, stone: 0, total: 18 } },
    { id: 8, text: "Next 7 Villagers to Wood", textEs: "Siguientes 7 aldeanos a madera", note: "Target: 12 on Wood. Build 2nd Lumber Camp if efficient.", noteEs: "Meta: 12 en madera. 2º campamento si conviene.", distribution: { food: 12, wood: 12, gold: 0, stone: 0, total: 25 } },
    { id: 9, text: "Build Houses", textEs: "Construye casas", note: "Ensure housing for 30+ pop.", noteEs: "Asegura casas para 30+ de población.", distribution: { food: 12, wood: 12, gold: 0, stone: 0, total: 25 } },
    { id: 10, text: "Next 5 Villagers to Gold", textEs: "Siguientes 5 aldeanos a oro", note: "Build Mining Camp. Target: 5 on Gold.", noteEs: "Construye campamento minero. Meta: 5 en oro.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 11, text: "Research Feudal Age", textEs: "Investiga Edad Feudal", note: "You should have ~30 Villagers.", noteEs: "Deberías tener ~30 aldeanos.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 12, text: "Build Barracks", textEs: "Construye cuartel", note: "Use a builder (from Wood/Food) while advancing.", noteEs: "Usa un constructor (de madera/comida) mientras avanzas.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 13, text: "Arrive Feudal: Build Blacksmith & Stable", textEs: "Llegas a Feudal: herrería y establo", note: "Queue Stable immediately.", noteEs: "Encola el establo de inmediato.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 14, text: "Research Castle Age", textEs: "Investiga Edad de los Castillos", note: "Requires 800 Food, 200 Gold.", noteEs: "Requiere 800 de comida y 200 de oro.", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 15, text: "Research Upgrades", textEs: "Investiga mejoras", note: "Wood (Double-Bit Axe), Food (Horse Collar), Gold (Mining), Blacksmith (Atk/Def)", noteEs: "Madera (hacha doble), comida (collera), oro (minería), herrería (ataque/defensa)", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } },
    { id: 16, text: "Arrive Castle: Mass Knights", textEs: "Llegas a Castillos: masa de caballeros", note: "Chingos de caballos!", noteEs: "¡Chingos de caballos!", distribution: { food: 12, wood: 12, gold: 5, stone: 0, total: 30 } }
];

export const scoutRush = [
    { id: 1, text: "Queue Villagers in TC constantly", textEs: "Encola aldeanos en el TC sin parar", note: "First 2 Villagers build a House each, then to sheep.", noteEs: "Los primeros 2 aldeanos construyen una casa cada uno y van a ovejas.", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "6 Villagers on Sheep", textEs: "6 aldeanos en ovejas", note: "Eat sheep under the TC, one at a time.", noteEs: "Come las ovejas bajo el TC, de una en una.", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 3, text: "4 Villagers on Wood", textEs: "4 aldeanos a madera", note: "Build a Lumber Camp on a good treeline.", noteEs: "Campamento maderero en un buen bosque.", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 4, text: "1 Villager lures Boar", textEs: "1 aldeano jala el jabalí", note: "Shoot it twice, run back to TC.", noteEs: "Dispárale dos veces y corre al TC.", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "1 Villager builds House + Mill on Berries", textEs: "1 aldeano construye casa + molino en bayas", note: "3 more join on berries (4 total).", noteEs: "Se suman 3 más a bayas (4 en total).", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 6, text: "1 Villager lures second Boar", textEs: "1 aldeano jala el segundo jabalí", note: "Keep 6-8 on food under TC.", noteEs: "Mantén 6-8 en comida bajo el TC.", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 7, text: "3 more Villagers on Wood", textEs: "3 aldeanos más a madera", note: "Total 7 on wood.", noteEs: "Total 7 en madera.", distribution: { food: 13, wood: 7, gold: 0, stone: 0, total: 20 } },
    { id: 8, text: "Research Loom, click Feudal Age at 21 pop", textEs: "Investiga Telar y dale a Feudal con 21 de pop", note: "Requires 500 Food.", noteEs: "Requiere 500 de comida.", distribution: { food: 13, wood: 7, gold: 0, stone: 0, total: 20 } },
    { id: 9, text: "While advancing: build Barracks", textEs: "Mientras avanzas: construye cuartel", note: "Use a wood Villager. Move 3 food vills to wood.", noteEs: "Usa un aldeano de madera. Mueve 3 de comida a madera.", distribution: { food: 10, wood: 10, gold: 0, stone: 0, total: 20 } },
    { id: 10, text: "Arrive Feudal: build Stable, queue Scouts", textEs: "Llegas a Feudal: establo y encola exploradores", note: "Non-stop Scout production. Keep making Villagers.", noteEs: "Producción de exploradores sin parar. Sigue haciendo aldeanos.", distribution: { food: 10, wood: 10, gold: 0, stone: 0, total: 21 } },
    { id: 11, text: "Attack with first 3-4 Scouts", textEs: "Ataca con los primeros 3-4 exploradores", note: "Hunt Villagers on wood/gold. Avoid the TC and Spearmen!", noteEs: "Caza aldeanos en madera/oro. ¡Evita el TC y los lanceros!", distribution: { food: 11, wood: 10, gold: 0, stone: 0, total: 22 } },
    { id: 12, text: "Add a second wave of Scouts + Bloodlines", textEs: "Agrega una segunda ola de exploradores + Linajes", note: "If food allows. New vills to food/wood.", noteEs: "Si alcanza la comida. Aldeanos nuevos a comida/madera.", distribution: { food: 13, wood: 11, gold: 0, stone: 0, total: 25 } },
    { id: 13, text: "Wall your base while raiding", textEs: "Amuralla tu base mientras raideas", note: "Their counterattack comes with Archers or Spears.", noteEs: "Su contraataque vendrá con arqueros o lanceros.", distribution: { food: 13, wood: 12, gold: 0, stone: 0, total: 26 } },
    { id: 14, text: "Add Gold miners, plan Castle Age", textEs: "Agrega mineros de oro y planea Castillos", note: "Transition into Knights or your civ's power unit.", noteEs: "Transiciona a caballeros o a la unidad fuerte de tu civ.", distribution: { food: 14, wood: 12, gold: 4, stone: 0, total: 30 } }
];

export const archerRush = [
    { id: 1, text: "Queue Villagers in TC constantly", textEs: "Encola aldeanos en el TC sin parar", note: "First 2 Villagers build a House each, then to sheep.", noteEs: "Los primeros 2 aldeanos construyen una casa cada uno y van a ovejas.", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "6 Villagers on Sheep", textEs: "6 aldeanos en ovejas", note: "Eat sheep under the TC.", noteEs: "Come las ovejas bajo el TC.", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 3, text: "4 Villagers on Wood", textEs: "4 aldeanos a madera", note: "Build a Lumber Camp.", noteEs: "Construye un campamento maderero.", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 4, text: "1 Villager lures Boar", textEs: "1 aldeano jala el jabalí", note: "Then stays on food under TC.", noteEs: "Luego se queda en comida bajo el TC.", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "1 Villager builds House + Mill on Berries", textEs: "1 aldeano construye casa + molino en bayas", note: "3 more join (4 on berries).", noteEs: "Se suman 3 más (4 en bayas).", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 6, text: "1 Villager lures second Boar", textEs: "1 aldeano jala el segundo jabalí", note: "Keep eating boars under the TC.", noteEs: "Sigue comiendo jabalíes bajo el TC.", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 7, text: "5 more Villagers on Wood", textEs: "5 aldeanos más a madera", note: "Total 9-10 on wood. 2nd Lumber Camp if needed.", noteEs: "Total 9-10 en madera. 2º campamento si hace falta.", distribution: { food: 12, wood: 9, gold: 0, stone: 0, total: 21 } },
    { id: 8, text: "1 Villager builds Barracks", textEs: "1 aldeano construye el cuartel", note: "At ~60% to Feudal Age.", noteEs: "Al ~60% del avance a Feudal.", distribution: { food: 12, wood: 9, gold: 0, stone: 0, total: 22 } },
    { id: 9, text: "Research Loom, click Feudal at 22 pop", textEs: "Investiga Telar y dale a Feudal con 22 de pop", note: "Requires 500 Food.", noteEs: "Requiere 500 de comida.", distribution: { food: 12, wood: 9, gold: 0, stone: 0, total: 22 } },
    { id: 10, text: "While advancing: 2 Villagers to Gold", textEs: "Mientras avanzas: 2 aldeanos a oro", note: "Build a Mining Camp.", noteEs: "Construye un campamento minero.", distribution: { food: 10, wood: 9, gold: 2, stone: 0, total: 22 } },
    { id: 11, text: "Arrive Feudal: build 2 Archery Ranges", textEs: "Llegas a Feudal: 2 galerías de tiro", note: "Non-stop Archer production from both.", noteEs: "Producción de arqueros sin parar en ambas.", distribution: { food: 10, wood: 9, gold: 3, stone: 0, total: 23 } },
    { id: 12, text: "Research Double-Bit Axe & Fletching", textEs: "Investiga hacha doble y emplumado", note: "Fletching before your first fight.", noteEs: "Emplumado antes de tu primera pelea.", distribution: { food: 10, wood: 10, gold: 4, stone: 0, total: 25 } },
    { id: 13, text: "Attack with 8-10 Archers", textEs: "Ataca con 8-10 arqueros", note: "Focus Villagers, dodge Skirmishers, micro back from Scouts.", noteEs: "Enfoca aldeanos, esquiva guerrilleros y retrocede ante exploradores.", distribution: { food: 11, wood: 10, gold: 5, stone: 0, total: 27 } },
    { id: 14, text: "Keep producing, wall your base", textEs: "Sigue produciendo y amuralla tu base", note: "Add Skirms if they mirror Archers. Plan Crossbow timing in Castle.", noteEs: "Agrega guerrilleros si copian arqueros. Planea el timing de ballesteros en Castillos.", distribution: { food: 12, wood: 11, gold: 5, stone: 0, total: 29 } }
];

export const drushFastCastle = [
    { id: 1, text: "Queue Villagers in TC constantly", textEs: "Encola aldeanos en el TC sin parar", note: "First 2 Villagers build a House each, then to sheep.", noteEs: "Los primeros 2 aldeanos construyen una casa cada uno y van a ovejas.", distribution: { food: 3, wood: 0, gold: 0, stone: 0, total: 3 } },
    { id: 2, text: "6 Villagers on Sheep", textEs: "6 aldeanos en ovejas", note: "Eat sheep under the TC.", noteEs: "Come las ovejas bajo el TC.", distribution: { food: 6, wood: 0, gold: 0, stone: 0, total: 6 } },
    { id: 3, text: "4 Villagers on Wood", textEs: "4 aldeanos a madera", note: "Build a Lumber Camp.", noteEs: "Construye un campamento maderero.", distribution: { food: 6, wood: 4, gold: 0, stone: 0, total: 10 } },
    { id: 4, text: "1 Villager lures Boar, research Loom", textEs: "1 aldeano jala el jabalí; investiga Telar", note: "Loom protects your drushing Villagers later.", noteEs: "El Telar protege a tus aldeanos del drush después.", distribution: { food: 7, wood: 4, gold: 0, stone: 0, total: 11 } },
    { id: 5, text: "1 Villager builds House + Mill on Berries", textEs: "1 aldeano construye casa + molino en bayas", note: "3 more join (4 on berries).", noteEs: "Se suman 3 más (4 en bayas).", distribution: { food: 11, wood: 4, gold: 0, stone: 0, total: 15 } },
    { id: 6, text: "1 Villager builds Barracks at ~19 pop", textEs: "1 aldeano construye cuartel a ~19 de pop", note: "Hide it in trees near mid-map if you're feeling spicy.", noteEs: "Escóndelo entre árboles a media mapa si te sientes atrevido.", distribution: { food: 12, wood: 4, gold: 0, stone: 0, total: 16 } },
    { id: 7, text: "1 Villager lures second Boar", textEs: "1 aldeano jala el segundo jabalí", note: "Keep TC food going.", noteEs: "Mantén la comida del TC fluyendo.", distribution: { food: 13, wood: 4, gold: 0, stone: 0, total: 17 } },
    { id: 8, text: "Train 3 Militia, send them to enemy eco", textEs: "Entrena 3 milicias y mándalas a la economía enemiga", note: "Harass Villagers on wood/berries. Don't fight the TC.", noteEs: "Molesta aldeanos en madera/bayas. No pelees contra el TC.", distribution: { food: 13, wood: 5, gold: 0, stone: 0, total: 18 } },
    { id: 9, text: "3 more Villagers on Wood", textEs: "3 aldeanos más a madera", note: "Total 7-8 on wood.", noteEs: "Total 7-8 en madera.", distribution: { food: 13, wood: 8, gold: 0, stone: 0, total: 21 } },
    { id: 10, text: "2 Villagers on Gold", textEs: "2 aldeanos a oro", note: "Mining Camp. Militia keep dancing in their eco.", noteEs: "Campamento minero. Las milicias siguen bailando en su eco.", distribution: { food: 14, wood: 8, gold: 2, stone: 0, total: 24 } },
    { id: 11, text: "Click Feudal Age at ~27 pop", textEs: "Dale a Feudal con ~27 de pop", note: "Your drush bought you the time to boom safely.", noteEs: "Tu drush te compró tiempo para boomear seguro.", distribution: { food: 16, wood: 9, gold: 2, stone: 0, total: 27 } },
    { id: 12, text: "While advancing: wall your base", textEs: "Mientras avanzas: amuralla tu base", note: "Use wood Villagers for palisades between forests.", noteEs: "Usa aldeanos de madera para empalizadas entre bosques.", distribution: { food: 13, wood: 12, gold: 2, stone: 0, total: 27 } },
    { id: 13, text: "Arrive Feudal: Market + Blacksmith", textEs: "Llegas a Feudal: mercado + herrería", note: "175 + 150 Wood. Keep making Villagers.", noteEs: "175 + 150 de madera. Sigue haciendo aldeanos.", distribution: { food: 13, wood: 10, gold: 4, stone: 0, total: 29 } },
    { id: 14, text: "Research Castle Age", textEs: "Investiga Edad de los Castillos", note: "800 Food, 200 Gold.", noteEs: "800 de comida y 200 de oro.", distribution: { food: 14, wood: 10, gold: 4, stone: 0, total: 30 } },
    { id: 15, text: "Arrive Castle: pick your power unit", textEs: "Llegas a Castillos: elige tu unidad fuerte", note: "Knights, Crossbows or your unique unit. You're ahead — use it.", noteEs: "Caballeros, ballesteros o tu unidad única. Vas adelante — aprovéchalo.", distribution: { food: 14, wood: 10, gold: 6, stone: 0, total: 32 } }
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
        nameEs: 'Fast Castle estándar',
        summary: 'Safe economic opening into Castle Age power units.',
        summaryEs: 'Apertura económica segura hacia unidades fuertes de Castillos.',
        risk: 'Low',
        civBias: ['cavalry', 'monk', 'siege', 'elephant', 'camel', 'defensive'],
        vsBias: ['infantry', 'monk', 'siege', 'defensive', 'naval'],
        steps: fastCastle,
    },
    {
        id: 'baidot',
        name: 'Baidot Fast Castle',
        nameEs: 'Fast Castle Baidot',
        summary: 'Simplified Fast Castle into mass Knights.',
        summaryEs: 'Fast Castle simplificado hacia masa de caballeros.',
        risk: 'Low',
        civBias: ['cavalry', 'camel', 'elephant'],
        vsBias: ['archer', 'siege', 'monk', 'naval'],
        steps: baidotFastCastle,
    },
    {
        id: 'scout_rush',
        name: 'Scout Rush (21 pop)',
        nameEs: 'Rush de exploradores (21 pop)',
        summary: 'Feudal aggression with Scouts to punish greedy openings.',
        summaryEs: 'Agresión Feudal con exploradores para castigar aperturas codiciosas.',
        risk: 'Medium',
        civBias: ['cavalry', 'cavalry_archer', 'camel'],
        vsBias: ['archer', 'gunpowder', 'monk', 'siege', 'defensive'],
        steps: scoutRush,
    },
    {
        id: 'archer_rush',
        name: 'Archer Rush (22 pop)',
        nameEs: 'Rush de arqueros (22 pop)',
        summary: 'Classic Feudal Archer pressure into Crossbow timing.',
        summaryEs: 'Presión clásica de arqueros en Feudal hacia timing de ballesteros.',
        risk: 'Medium',
        civBias: ['archer', 'eagle', 'gunpowder'],
        vsBias: ['infantry', 'eagle', 'monk', 'elephant', 'siege'],
        steps: archerRush,
    },
    {
        id: 'drush_fc',
        name: 'Drush → Fast Castle',
        nameEs: 'Drush → Fast Castle',
        summary: 'Dark Age Militia harass buying time for a safe Fast Castle.',
        summaryEs: 'Acoso con milicias en Alta Edad Media que compra tiempo para un Fast Castle seguro.',
        risk: 'Medium',
        civBias: ['infantry', 'eagle', 'monk', 'siege'],
        vsBias: ['archer', 'defensive', 'cavalry_archer', 'naval'],
        steps: drushFastCastle,
    },
];

export function getBuildOrderById(id) {
    return buildOrders.find(b => b.id === id);
}
