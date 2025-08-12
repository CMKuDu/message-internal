
import Cookies from 'js-cookie';


class CookieTokenService {
    private static readonly ACCESSTOKEN = "accessToken"
    private static readonly REFRESHTOKEN = "refreshToken"
    static clearAll() {
        Cookies.remove(this.ACCESSTOKEN)
        Cookies.remove(this.REFRESHTOKEN)
    }
    static getAccessToken() {
        return Cookies.get(this.ACCESSTOKEN);
    }
    static getRefreshToken() {
        return Cookies.get(this.REFRESHTOKEN);
    }
    static setAccessToken(accessToken: string) {
        Cookies.set(this.ACCESSTOKEN, accessToken, {
            expires: 1,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })
    }
    static setRefreshToken(refreshToken: string) {
        Cookies.set(this.REFRESHTOKEN, refreshToken, {
            expires: 30, // 30 ngày
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    }

}
export default CookieTokenService;