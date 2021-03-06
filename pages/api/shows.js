import fetch from "isomorphic-unfetch"

import auth0 from "../../lib/auth0"
import config from "../../lib/config"

export default async function shows(req, res) {
    try {
        const tokenCache = auth0.tokenCache(req, res)
        const { accessToken } = await tokenCache.getAccessToken({
            scopes: ["r_liteprofile"],
        })

        const url = "https://api.linkedin.com/v2/me"
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        const shows = await response.json()
        res.status(200).json(shows)
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).json({
            code: error.code,
            error: error.message,
        })
    }
}
