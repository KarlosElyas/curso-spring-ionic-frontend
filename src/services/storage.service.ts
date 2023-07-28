import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

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

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null){
            return JSON.parse(str); // faz o parse para Cart JSON
        }else {
            return null;
        }
    }

    setCart(obj : Cart) {
        if (obj != null) { // stringify "Converte obj para JavaScript Object Notation (JSON)"
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        } else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }
}