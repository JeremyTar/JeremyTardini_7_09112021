import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { User } from "../user/user.model";;

@Injectable()
export class UserService {

    isAuth = false;
    showCreateForm= false;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getUsers(): Observable<object> {
        return this.http.get('http://localhost:3000/api/users')
    }

    getUser(id: any): Observable<object> {
        return this.http.get('http://localhost:3000/api/users/' + id)
    }

    updateUser(data: User, id: any): Observable<object> {
        return this.http.put<User>('http://localhost:3000/api/users/' + id, data);
    }

    deleteUser(id: any): Observable<object> {
        return this.http.request('DELETE', 'http://localhost:3000/api/users/' + id);
    }



    loginUser(email: string, password: string): Observable<object> {
        return this.http.post('http://localhost:3000/api/users/login', { email, password });
    }

    createUser(newUser: User): Observable<object> {

        return this.http.post('http://localhost:3000/api/users', newUser);
    }

    signOut() {
        localStorage.clear();
        this.isAuth = false;
        this.router.navigate(['']);

    }


}