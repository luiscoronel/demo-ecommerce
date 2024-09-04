import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
    }    
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    console.log(`Ejecutando un metodo ${req.method} en la ruta ${req.url} - ${date} `);
    next();
}
