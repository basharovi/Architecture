import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AppAuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router) { }

    login(model: { login: string, password: string }): void {
        this.http
            .post("auths", model)
            .subscribe((result: any) => {
                if (!result || !result.token) { return; }
                sessionStorage.setItem("token", result.token);
                this.router.navigate(["/main/home"]);
            });
    }

    signed() {
        return this.token() !== null;
    }

    signin() {
        this.router.navigate(["/login"]);
    }

    signout() {
        sessionStorage.clear();
        this.signin();
    }

    token() {
        return sessionStorage.getItem("token");
    }
}
