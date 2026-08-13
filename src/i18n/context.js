import { createContext, useContext } from 'react';
import { STRINGS } from './strings';

export const LanguageContext = createContext({
    lang: 'en',
    setLang: () => { },
    t: (key) => key,
});

export function useLang() {
    return useContext(LanguageContext);
}

/**
 * Reads a localized field from a data object: loc(unit, 'name', 'es')
 * returns unit.nameEs when in Spanish (falling back to unit.name).
 */
export function loc(obj, field, lang) {
    if (!obj) return '';
    if (lang === 'es') {
        const es = obj[field + 'Es'];
        if (es) return es;
    }
    return obj[field] || '';
}

const TYPE_ES = {
    'Archer': 'Arquero', 'Infantry': 'Infantería', 'Cavalry': 'Caballería',
    'Cavalry Archer': 'Arquero a caballo', 'Siege': 'Asedio', 'Monk': 'Monje',
    'Gunpowder': 'Pólvora', 'Camel': 'Camello', 'Petard': 'Petardo',
};

/**
 * Localizes a unit type label like "Siege/Gunpowder" token by token.
 */
export function locType(type, lang) {
    if (!type || lang !== 'es') return type || '';
    return type.split('/').map(part => TYPE_ES[part.trim()] || part.trim()).join('/');
}

export function translate(lang, key, params) {
    const table = STRINGS[lang] || STRINGS.en;
    let text = table[key] ?? STRINGS.en[key] ?? key;
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            text = text.replace(`{${k}}`, v);
        }
    }
    return text;
}
