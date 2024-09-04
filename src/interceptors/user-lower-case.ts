import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { log } from "util";

@Injectable()
export class UserLowerCaseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
         const data = request.body;
         
        if (data && typeof data.email === 'string') {
            data.email = data.email.toLowerCase();        
        }

         return next.handle();
    }   
}