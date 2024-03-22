

export class StorageService {
    sessionKey = {
        login: 'user-session'
    }

    setItem(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data))
    }

    getItem(key) {
        return JSON.parse(sessionStorage.getItem(key))
    }

    removeItem(key) {
        sessionStorage.removeItem(key)
    }

    clearAll() {
        sessionStorage.clear()
    }


}

const storageService = new StorageService();
export default storageService;