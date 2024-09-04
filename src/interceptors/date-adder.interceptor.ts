import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class DateAdderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = new Date();
        const format = now.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hourCycle: 'h24',
        });
        console.log("Este es el formato: ", format);
        
        const request = context.switchToHttp().getRequest();
        console.log(request);
        
        request.now = format;
        console.log(request.now);
        
        return next.handle();
        
    }
    
}