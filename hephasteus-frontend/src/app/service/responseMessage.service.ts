import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ResponseMessageService implements HttpInterceptor {
    constructor(private messageService: MessageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
            return next.handle(req);
        }
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
                    this.messageService.add({severity:'success', summary:'Success', detail:'Operation succeeded'});
                }
                if (event instanceof HttpResponse && (event.status >=300 && event.status<400)) {
                    this.messageService.add({severity:'warn', summary:'Warning', detail:'Something is not quite right!'});
                }
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status >= 400 && err.status < 505) {
                    this.messageService.add({severity:'error', summary:'Error', detail:err.error.detail});
                }
                return throwError(err);
            })
        );
    }
}
