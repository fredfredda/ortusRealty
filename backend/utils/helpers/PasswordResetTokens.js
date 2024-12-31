
function createToken(data, expiresIn) {
    const expirationTime = Date.now() + expiresIn;
    const tokenData = { data, expirationTime };
    const token = btoa(JSON.stringify(tokenData));
    return token;
}

function verifyToken(tokenId, token) {
    try {
        const tokenData = JSON.parse(atob(token)); 

        if (tokenData.data.tokenId !== tokenId) {
            return { valid: false, reason: "Invalid token" };
        }

        const currentTime = Date.now();
        if (currentTime > tokenData.expirationTime) {
            return { valid: false, reason: "Token has expired" };
        }

        return { valid: true, data: tokenData.data };
    } catch (error) {
        return { valid: false, reason: "Invalid token format" };
    }
}

export { createToken, verifyToken };