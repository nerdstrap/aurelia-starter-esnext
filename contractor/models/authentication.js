export class AuthenticationChannels {
    RSA_Token = false;
    Email = false;
    SMS = false;
    Questions = false;
    Password = false;
    Pin = false;
    authTypesArray = [];

    constructor() {
        this.bob = "bob";
        this.authTypesArray.push(this.RSA_Token);
    }

    //displayAuthTypes(authTypes) {
    //    console.log(authTypesArray);
    //    for(var i = 0; i < authTypes.length;i++){
    //        authTypesArray[i] = true;
    //    }
    //    console.log(authTypesArray);
    //}
}
