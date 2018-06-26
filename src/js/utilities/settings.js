const SETTINGS_KEY = 'settings';

const DEFAULT_SETTINGS = {
    hiddenLists: []
};

const getSettings = () =>
    JSON.parse(localStorage.getItem(SETTINGS_KEY)) || DEFAULT_SETTINGS;

const setSettings = settings =>
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

const clearSettings = () =>
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));

export { getSettings, setSettings, clearSettings };
