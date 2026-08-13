import { useState, useCallback, useMemo } from 'react';
import { LanguageContext, translate } from './context';

function initialLang() {
    try {
        const stored = localStorage.getItem('aoe2_lang');
        if (stored === 'en' || stored === 'es') return stored;
        return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
    } catch {
        return 'en';
    }
}

function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(initialLang);

    const setLang = useCallback((next) => {
        setLangState(next);
        try { localStorage.setItem('aoe2_lang', next); } catch { /* storage unavailable */ }
    }, []);

    const value = useMemo(() => ({
        lang,
        setLang,
        t: (key, params) => translate(lang, key, params),
    }), [lang, setLang]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;
