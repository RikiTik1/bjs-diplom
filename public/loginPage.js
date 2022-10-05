'use strict'

// Вход и регистрация 

const userForm1 = new UserForm();

userForm1.loginFormCallback = data => {
    let login = data.login;
    let password = data.password;

    ApiConnector.login({login, password}, data => {
        if(data.success){
            location.reload();
        } else {
            userForm1.setLoginErrorMessage("error");
        };
});
};


userForm1.registerFormCallback = data => {
    login = data.login;
    password = data.password;

    ApiConnector.register({login, password}, data => {
        if(data.success){
            location.reload();
        } else {
            userForm1.setRegisterErrorMessage("error");
        };
    })
}