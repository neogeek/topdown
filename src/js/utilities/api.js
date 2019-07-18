import {APP_NAME, APP_KEY, API_URL, REDIRECT_URL} from '../config';

export const apiRequest = (path, {userToken}) =>
    fetch(`${API_URL}/${path}&key=${APP_KEY}&token=${userToken}`).then(response => {

        if (!response.ok) {

            throw Error(response.statusText);

        }
        return response.json();

    });

export const authorize = () => {

    window.location.href = `${API_URL}/authorize?response_type=token&key=${APP_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&callback_method=fragment&scope=read%2Cwrite&expiration=never&name=${encodeURIComponent(APP_NAME)}`;

};
