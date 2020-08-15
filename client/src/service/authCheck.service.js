import UserService from './auth.service';
import { BehaviorSubject } from 'rxjs';

export const $isLoggedIn = new BehaviorSubject();

export const authenticationService = {
    isLoggedIn: $isLoggedIn.asObservable(),
    get loginStatusValue() { return $isLoggedIn.value }
};

class AuthCheck {

    constructor() {
        this.checkLogin();
    }

    async checkLogin() {
        const token = await localStorage.getItem('user');
        if (token) {
            UserService.Auth().then((data) => {
                console.log(true);
                $isLoggedIn.next(true);
            }, error => {
                $isLoggedIn.next(false);
                console.log(false);
            })
        } else {
            $isLoggedIn.next(false);
        }
    }

    logout(cb) {
        localStorage.removeItem('user');
        this.$isLoggedIn.next(false);
        cb();
    }

}

export default new AuthCheck();
