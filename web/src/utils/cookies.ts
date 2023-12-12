export function setCookie(name: string, data: string): true | Error {
    try {
        let date = new Date()
        date.setTime(date.getTime() + 60 * 60 * 24 * 30);
        document.cookie = `${name}=${data}; expires=${date.toUTCString()}`
        return true
    }
    catch (e) {
        return new Error("Cannot set cookies" + e)
    }
}

export function getCookie(name: string): string | Error {
    try {
        const cookies: string = document.cookie;
        let requiredCookieValue = "";

        cookies.split(";").map((value) => {
            const [key, cookieValue] = value.trim().split("=")
            if (key === name)
                requiredCookieValue = cookieValue;
        })
        return requiredCookieValue || new Error("no cookie found");
    }
    catch (e) {
        return new Error("Cannot get cookies" + e)
    }
}

