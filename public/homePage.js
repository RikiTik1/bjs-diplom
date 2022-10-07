//выход из личного каббинета.

const logoutPA = new LogoutButton();
logoutPA.action  = function logout(data){
    ApiConnector.logout((response) => {
    if(response.success == true){
        location.reload();
 };
});
};

//выход из личного каббинета.

//Получение информации о пользователе.

ApiConnector.current(({data, success}) => {
    if(success === true){
        ProfileWidget.showProfile(data);
    };
});

//Получение информации о пользователе.

//Получение текущих курсов валюты.

const ratesBoard = new RatesBoard;

let timer = setInterval(() => {
    ApiConnector.getStocks(response => {
    if (response.success === true) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    };
});
}, 1000);

//Получение текущих курсов валюты.

//Операции с деньгами.

//Пополнение баланса.
const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Успешное пополнение.');
            } else {
        moneyManager.setMessage(false, response.error);
        };
       });
};

//Конвертирование валюты.
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Успешное конвертация валюты.');
            } else {
        moneyManager.setMessage(false, response.error);
        };
       });
};

//Перевод валюты.
moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Успешный перевод средств.');
            } else {
        moneyManager.setMessage(false, response.error);
        };
    });
};

//Операции с деньгами.

//Работа с избранным

//начальный список избранного
const favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites(response => {
    if(response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

//добавления пользователя в список избранных
favoritesWidget.addUserCallback = function (data){
    ApiConnector.addUserToFavorites(data, (response) => {
        if(response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Добавлен пользователь в список избранных.');
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback  = function (data){
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Удален пользователь из избранного.');
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};
//Начальный список избранного

