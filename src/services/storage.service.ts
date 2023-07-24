import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        // obtém a string no localStorage do HTML5 como JSON
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null){
            return null;
        }else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj == null) { // se for vazio ele remove o atual
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}