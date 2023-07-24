import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){}

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            { //objeto
                observe: 'response',
                responseType: 'text' // text pra evitar converter para json e da erro(Parse)
                // o endpoint /login retorna resposta de corpo vazio que convertido pra JSON da erro
            }
        );
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7); //recebe o bearer da autenticação
        
        let user : LocalUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}