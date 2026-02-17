export class VMAuthReq
{
    username : string = "";
    password : string = "";
}

export class VMAuthResponse
{
    userCode : number = 0;
    token : string = "";
    isAuthenticated : boolean = true;
    forcePasswordChange : boolean = false;
}

export class VMPasswordChangeReq
{
    oldPassword : string = "";
    newPassword : string = "";
    confirmPassword : string = "";
}