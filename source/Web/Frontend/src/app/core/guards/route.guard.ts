import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AppAuthService } from "src/app/core/services/auth.service";

@Injectable({ providedIn: "root" })
export class AppRouteGuard implements CanActivate {
    constructor(private readonly appAuthService: AppAuthService) { }

    canActivate() {
        if (this.appAuthService.signed()) { return true; }
        this.appAuthService.signin();
        return false;
    }
}
