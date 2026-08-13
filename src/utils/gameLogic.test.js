import { describe, it, expect } from 'vitest';
import { createGameData, findCountersIn, getKeyThreatsIn, recommendBuildOrders } from './gameLogic';
import { buildOrders } from '../data/buildOrders';
import realCivs from '../data/civs.json';
import realUnits from '../data/units.json';

// ---------------------------------------------------------------------------
// Fixture-based unit tests
// ---------------------------------------------------------------------------

const fixtureUnits = [
    { id: 'archer', name: 'Archer', type: 'Archer', upgradesTo: 'crossbowman', counteredBy: ['skirmisher'] },
    { id: 'crossbowman', name: 'Crossbowman', type: 'Archer', upgradesTo: 'arbalester', counteredBy: ['elite_skirmisher'] },
    { id: 'arbalester', name: 'Arbalester', type: 'Archer', counteredBy: ['elite_skirmisher', 'hussar'] },
    { id: 'skirmisher', name: 'Skirmisher', type: 'Archer', upgradesTo: 'elite_skirmisher', counteredBy: ['knight'] },
    { id: 'elite_skirmisher', name: 'Elite Skirmisher', type: 'Archer', counteredBy: ['knight'] },
    { id: 'scout_cavalry', name: 'Scout Cavalry', type: 'Cavalry', upgradesTo: 'light_cavalry', counteredBy: ['spearman'] },
    { id: 'light_cavalry', name: 'Light Cavalry', type: 'Cavalry', upgradesTo: 'hussar', counteredBy: ['pikeman'] },
    { id: 'hussar', name: 'Hussar', type: 'Cavalry', counteredBy: ['halberdier'] },
    { id: 'knight', name: 'Knight', type: 'Cavalry', upgradesTo: 'cavalier', counteredBy: ['pikeman', 'unit_missing_from_data'] },
    { id: 'cavalier', name: 'Cavalier', type: 'Cavalry', counteredBy: ['halberdier'] },
    { id: 'spearman', name: 'Spearman', type: 'Infantry', upgradesTo: 'pikeman', counteredBy: ['archer'] },
    { id: 'pikeman', name: 'Pikeman', type: 'Infantry', upgradesTo: 'halberdier', counteredBy: ['archer'] },
    { id: 'halberdier', name: 'Halberdier', type: 'Infantry', counteredBy: ['archer'] },
    { id: 'unique_super_spear', name: 'Super Spear', type: 'Infantry', unique: true, counteredBy: ['archer'] },
    { id: 'broken_chain_unit', name: 'Broken', type: 'Siege', upgradesTo: 'does_not_exist', counteredBy: ['knight'] },
    { id: 'vs_broken', name: 'VsBroken', type: 'Siege', counteredBy: ['broken_chain_unit'] },
];

const fixtureCivs = [
    {
        id: 'full_civ',
        name: 'FullCiv',
        roster: ['arbalester', 'elite_skirmisher', 'hussar', 'cavalier', 'halberdier'],
        uniqueUnits: ['unique_super_spear'],
    },
    {
        id: 'limited_civ',
        name: 'LimitedCiv',
        // Only mid-tier units: no halberdier, no cavalier
        roster: ['crossbowman', 'elite_skirmisher', 'pikeman', 'light_cavalry'],
        uniqueUnits: [],
    },
    {
        id: 'no_counters_civ',
        name: 'NoCountersCiv',
        roster: ['arbalester'],
        uniqueUnits: [],
    },
];

const data = createGameData(fixtureCivs, fixtureUnits);

describe('findCountersIn (fixtures)', () => {
    it('returns [] for unknown enemy unit', () => {
        expect(findCountersIn(data, 'nope', 'full_civ')).toEqual([]);
    });

    it('returns [] for unknown civ', () => {
        expect(findCountersIn(data, 'knight', 'nope')).toEqual([]);
    });

    it('returns [] when the civ has no unit in any counter chain', () => {
        // knight is countered by pikeman line; no_counters_civ only has arbalester
        expect(findCountersIn(data, 'knight', 'no_counters_civ')).toEqual([]);
    });

    it('suggests the highest tier of the counter chain the civ owns', () => {
        // knight countered by pikeman -> halberdier; full_civ owns halberdier
        const result = findCountersIn(data, 'knight', 'full_civ');
        expect(result.map(u => u.id)).toContain('halberdier');
        expect(result.map(u => u.id)).not.toContain('pikeman');
    });

    it('falls back to a mid-tier unit when the top tier is not available', () => {
        // limited_civ has pikeman but not halberdier
        const result = findCountersIn(data, 'knight', 'limited_civ');
        expect(result.map(u => u.id)).toContain('pikeman');
        expect(result.map(u => u.id)).not.toContain('halberdier');
    });

    it('walks the chain even when the base counter itself is not owned', () => {
        // scout_cavalry countered by spearman; limited_civ owns pikeman (upgrade of spearman)
        const result = findCountersIn(data, 'scout_cavalry', 'limited_civ');
        expect(result.map(u => u.id)).toContain('pikeman');
    });

    it('prioritizes unique units of the same type as a found counter', () => {
        // knight countered by halberdier (Infantry); full_civ's unique_super_spear is Infantry
        const result = findCountersIn(data, 'knight', 'full_civ');
        expect(result[0].id).toBe('unique_super_spear');
    });

    it('ignores counter ids that do not exist in the unit data', () => {
        // knight's counteredBy includes 'unit_missing_from_data'
        expect(() => findCountersIn(data, 'knight', 'full_civ')).not.toThrow();
    });

    it('survives a broken upgradesTo chain', () => {
        // vs_broken countered by broken_chain_unit whose upgradesTo points nowhere
        expect(() => findCountersIn(data, 'vs_broken', 'full_civ')).not.toThrow();
    });

    it('returns no duplicate units', () => {
        for (const civ of fixtureCivs) {
            for (const unit of fixtureUnits) {
                const ids = findCountersIn(data, unit.id, civ.id).map(u => u.id);
                expect(new Set(ids).size).toBe(ids.length);
            }
        }
    });
});

// ---------------------------------------------------------------------------
// Integrity + smoke tests over the real bundled data
// ---------------------------------------------------------------------------

const realData = createGameData(realCivs, realUnits);

describe('bundled data integrity', () => {
    it('has no duplicate unit ids', () => {
        const ids = realUnits.map(u => u.id);
        const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
        expect(dupes).toEqual([]);
    });

    it('has no duplicate civ ids', () => {
        const ids = realCivs.map(c => c.id);
        const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
        expect(dupes).toEqual([]);
    });

    it('every counteredBy entry references an existing unit', () => {
        const bad = [];
        for (const u of realUnits) {
            for (const c of u.counteredBy || []) {
                if (!realData.unitsMap[c]) bad.push(`${u.id} -> ${c}`);
            }
        }
        expect(bad).toEqual([]);
    });

    it('every upgradesTo entry references an existing unit', () => {
        const bad = [];
        for (const u of realUnits) {
            if (u.upgradesTo && !realData.unitsMap[u.upgradesTo]) bad.push(`${u.id} -> ${u.upgradesTo}`);
        }
        expect(bad).toEqual([]);
    });

    it('every civ roster and unique unit references an existing unit', () => {
        const bad = [];
        for (const civ of realCivs) {
            for (const id of [...(civ.roster || []), ...(civ.uniqueUnits || [])]) {
                if (!realData.unitsMap[id]) bad.push(`${civ.id} -> ${id}`);
            }
        }
        expect(bad).toEqual([]);
    });

    it('every unit has an imageUrl and wikiUrl', () => {
        const noImage = realUnits.filter(u => !u.imageUrl).map(u => u.id);
        const noWiki = realUnits.filter(u => !u.wikiUrl).map(u => u.id);
        expect(noImage).toEqual([]);
        expect(noWiki).toEqual([]);
    });
});

describe('findCounters over real data (smoke)', () => {
    it('never throws and always returns an array, for every civ vs every unit', () => {
        for (const civ of realCivs) {
            for (const unit of realUnits) {
                const result = findCountersIn(realData, unit.id, civ.id);
                expect(Array.isArray(result)).toBe(true);
            }
        }
    });

    it('Franks vs Knight suggests Halberdier (top of the spear line)', () => {
        const ids = findCountersIn(realData, 'knight', 'franks').map(u => u.id);
        expect(ids).toContain('halberdier');
    });

    it('Aztecs vs Knight suggests Pikeman (they lack Halberdier)', () => {
        const ids = findCountersIn(realData, 'knight', 'aztecs').map(u => u.id);
        expect(ids).toContain('pikeman');
        expect(ids).not.toContain('halberdier');
    });

    it('Chinese vs Arbalester prioritizes Chu Ko Nu only if it counters; otherwise standard counters', () => {
        // arbalester countered by elite_skirmisher (Archer type) -> Chu Ko Nu (Archer) gets suggested by type heuristic
        const ids = findCountersIn(realData, 'arbalester', 'chinese').map(u => u.id);
        expect(ids.length).toBeGreaterThan(0);
        expect(ids).toContain('elite_skirmisher');
    });
});

describe('getKeyThreatsIn', () => {
    it('returns [] for unknown civ', () => {
        expect(getKeyThreatsIn(realData, 'nope')).toEqual([]);
    });

    it('lists unique units first', () => {
        const threats = getKeyThreatsIn(realData, 'franks');
        expect(threats[0].id).toBe('unique_throwing_axeman');
    });

    it('Franks (cavalry) include their best knight-line unit: Paladin', () => {
        const ids = getKeyThreatsIn(realData, 'franks').map(u => u.id);
        expect(ids).toContain('paladin');
    });

    it('Aztecs include Eagle Warriors even though their style is Infantry', () => {
        const ids = getKeyThreatsIn(realData, 'aztecs').map(u => u.id);
        expect(ids).toContain('elite_eagle_warrior');
    });

    it('Khmer (siege+elephant) include Battle Elephants and siege units', () => {
        const ids = getKeyThreatsIn(realData, 'khmer').map(u => u.id);
        expect(ids).toContain('battle_elephant');
        expect(ids.some(id => ['onager', 'heavy_scorpion', 'siege_ram'].includes(id))).toBe(true);
    });

    it('Spanish (gunpowder+monk) include Hand Cannoneer and Monk', () => {
        const ids = getKeyThreatsIn(realData, 'spanish').map(u => u.id);
        expect(ids).toContain('hand_cannoneer');
        expect(ids).toContain('monk');
    });

    it('every civ has at least one identified threat', () => {
        const empty = realCivs.filter(c => getKeyThreatsIn(realData, c.id).length === 0).map(c => c.id);
        expect(empty).toEqual([]);
    });

    it('never returns more than 7 threats nor duplicates', () => {
        for (const civ of realCivs) {
            const ids = getKeyThreatsIn(realData, civ.id).map(u => u.id);
            expect(ids.length).toBeLessThanOrEqual(7);
            expect(new Set(ids).size).toBe(ids.length);
        }
    });

    it('every civ has a structured archetypes array', () => {
        const missing = realCivs.filter(c => !Array.isArray(c.archetypes)).map(c => c.id);
        expect(missing).toEqual([]);
    });
});

describe('recommendBuildOrders', () => {
    const civ = id => realCivs.find(c => c.id === id);

    it('returns [] without a user civ', () => {
        expect(recommendBuildOrders(null, civ('franks'), buildOrders)).toEqual([]);
    });

    it('ranks every build order, sorted best-first', () => {
        const ranked = recommendBuildOrders(civ('franks'), civ('britons'), buildOrders);
        expect(ranked.length).toBe(buildOrders.length);
        for (let i = 1; i < ranked.length; i++) {
            expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score);
        }
    });

    it('cavalry civ vs archer civ favors a cavalry opening (Scout Rush or FC into Knights)', () => {
        const best = recommendBuildOrders(civ('franks'), civ('britons'), buildOrders)[0];
        expect(['scout_rush', 'baidot', 'standard']).toContain(best.order.id);
    });

    it('archer civ favors the Archer Rush against infantry civs', () => {
        const best = recommendBuildOrders(civ('mayans'), civ('goths'), buildOrders)[0];
        expect(best.order.id).toBe('archer_rush');
    });

    it('works without an enemy civ (user civ only)', () => {
        const ranked = recommendBuildOrders(civ('aztecs'), null, buildOrders);
        expect(ranked.length).toBe(buildOrders.length);
        expect(ranked[0].score).toBeGreaterThan(0);
    });

    it('every recommendation with score > 0 includes structured reasons', () => {
        for (const userCiv of realCivs) {
            const ranked = recommendBuildOrders(userCiv, null, buildOrders);
            for (const r of ranked) {
                if (r.score > 0) {
                    expect(r.reasons.length).toBeGreaterThan(0);
                    for (const reason of r.reasons) {
                        expect(['civ', 'enemy']).toContain(reason.kind);
                        expect(typeof reason.archetype).toBe('string');
                    }
                }
            }
        }
    });

    it('every civ pair produces a top recommendation with a positive score', () => {
        // sample a subset to keep the test fast
        const sample = realCivs.filter((_, i) => i % 5 === 0);
        for (const a of sample) {
            for (const b of sample) {
                const ranked = recommendBuildOrders(a, b, buildOrders);
                expect(ranked[0].score).toBeGreaterThan(0);
            }
        }
    });
});

describe('Spanish translations (i18n data)', () => {
    it('every unit has nameEs and strategyNoteEs', () => {
        const noName = realUnits.filter(u => !u.nameEs).map(u => u.id);
        const noNote = realUnits.filter(u => !u.strategyNoteEs).map(u => u.id);
        expect(noName).toEqual([]);
        expect(noNote).toEqual([]);
    });

    it('every civ has nameEs and summaryEs', () => {
        const noName = realCivs.filter(c => !c.nameEs).map(c => c.id);
        const noSummary = realCivs.filter(c => !c.summaryEs).map(c => c.id);
        expect(noName).toEqual([]);
        expect(noSummary).toEqual([]);
    });

    it('every build order and step is translated', () => {
        const missing = [];
        for (const order of buildOrders) {
            if (!order.nameEs || !order.summaryEs) missing.push(order.id);
            order.steps.forEach((s, i) => {
                if (!s.textEs) missing.push(`${order.id}[${i}].textEs`);
                if (s.note && !s.noteEs) missing.push(`${order.id}[${i}].noteEs`);
            });
        }
        expect(missing).toEqual([]);
    });
});
