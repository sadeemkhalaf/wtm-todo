import UserService from './auth.service';
import { ReplaySubject } from 'rxjs';

export const $isLoggedIn = new ReplaySubject(1);

export const authenticationService = {
    isLoggedIn: $isLoggedIn.asObservable(),
    get loginStatusValue() { return $isLoggedIn.value }
};

class AuthCheck {

    constructor() {
        this.auth = false;
        this.checkLogin();
    }

    async checkLogin() {
        const token = await localStorage.getItem('user');
        if (token) {
            UserService.Auth().then((data) => {
                this.auth = true;
                $isLoggedIn.next(true);
            }, error => {
                this.auth = false;
                $isLoggedIn.next(false);
            })
        } else {
            this.auth = false;
            $isLoggedIn.next(false);
        }
    }

    logout(cb) {
        localStorage.removeItem('user')
        this.auth = false;
        cb();
    }

}

export default new AuthCheck();
