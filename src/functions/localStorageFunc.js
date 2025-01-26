export function writeLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function readLocalStorage(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}

export function clearLocalStorage() {
    localStorage.clear();
}

export function updateLocalStorage(key, fn, value) {
    const data = readLocalStorage(key);
    switch (fn) {
        case 'add':
            if (data) {
                writeLocalStorage(key, [...data, value]);
            } else {
                writeLocalStorage(key, [value]);
            }
            break;
        case 'remove':
            if (data) {
                writeLocalStorage(key, data.filter(item => item !== value));
            }
            break;    
    }

}
export default { writeLocalStorage, readLocalStorage, removeLocalStorage, clearLocalStorage, updateLocalStorage };