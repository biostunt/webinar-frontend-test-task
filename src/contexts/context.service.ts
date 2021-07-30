const STORAGE_KEY = '__STORAGE_KEY';

export const storageAvaiable = (length: number): boolean => {
    try {    
        localStorage.setItem(STORAGE_KEY, new Array(length).fill('_').join(''));
        localStorage.removeItem(STORAGE_KEY);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    }
}