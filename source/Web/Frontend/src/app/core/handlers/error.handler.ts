import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { AppAuthService } from "src/app/core/services/auth.service";
import { AppModalService } from "src/app/core/services/modal.service";

@Injectable({ providedIn: "root" })
export class AppErrorHandler implements ErrorHandler {
    constructor(private readonly injector: Injector) { }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 401: {
                    const appAuthService = this.injector.get<AppAuthService>(AppAuthService);
                    appAuthService.signin();
                    return;
                }
                case 422: {
                    const appModalService = this.injector.get<AppModalService>(AppModalService);
                    appModalService.alert(error.error);
                    return;
                }
            }
        }

        console.error(error);
    }
}
