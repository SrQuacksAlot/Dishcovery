import { makeAutoObservable } from "mobx";
import { firebaseAuth } from "../firebase/firebaseModel";


//Not Used
class AuthModel {
    email = "";
    password = "";

    constructor() {
        makeAutoObservable(this);
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    async signIn() {
        return await firebaseAuth.signInWithEmailAndPassword(this.email, this.password);
    }

    async signUp() {
        return await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
    }
}

export const authModel = new AuthModel();
