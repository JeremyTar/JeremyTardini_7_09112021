import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { User } from "../user/user.model";;

@Injectable()
export class UserService {

    isAuth = true;
    showCreateForm= false;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    // get function

    getUsers(): Observable<object> {
        return this.http.get('http://localhost:3000/api/users')
    }

    getUser(id: any): Observable<object> {
        return this.http.get('http://localhost:3000/api/users/' + id)
    }


    //updates

    updateUser(data: User, id: any): Observable<object> {
        return this.http.put<User>(`http://localhost:3000/api/users/${id}`, data);
    }

    sendAvatarPhoto(id: string | null, formdata: FormData): Observable<object> {
        return this.http.put("http://localhost:3000/api/users/" + id, formdata)
    }

    deleteUser(id: any): Observable<object> {
        return this.http.delete(`http://localhost:3000/api/users/${id}`);
    }
    changePassword(passwords: string, id: string): Observable<object> {
        return this.http.put(`http://localhost:3000/api/users/password/${id}`, passwords)
    }
    changeEmail(content: string, id: string): Observable<object> {
        return this.http.put(`http://localhost:3000/api/users/email/${id}`, content)
    }
    //auth

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