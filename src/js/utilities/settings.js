export const getJSONSetting = (key, defaultvalue) =>
    JSON.parse(localStorage.getItem(key)) || defaultvalue;

export const getSetting = (key, defaultvalue) =>
    localStorage.getItem(key) || defaultvalue;

export const removeSetting = key => localStorage.removeItem(key);

export const setJSONSetting = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

export const setSetting = (key, value) =>
    value && localStorage.setItem(key, value);
