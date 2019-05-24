import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Message } from '../_models/message';
@Injectable()

export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 5;
    messageContainer ="Unread";

   constructor(private userService: UserService, private router: Router, private alertify: AlertifyService,
    private authService: AuthService)
   {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Message[]>{
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber,this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}