import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../configs/firebase-config.js";  // Импортируем уже инициализированный auth
import * as TEXT from "../constants/text.js";
import { updateState } from "./state.js";
import { updateBookingButtons } from "./bookingButton.js";

// Функция для входа через Google с поддержкой мобильных устройств
export function runLogin() {
    const provider = new GoogleAuthProvider();
    
    // Проверяем, является ли устройство мобильным
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Используем redirect для мобильных устройств
        signInWithRedirect(auth, provider);
        
    } else {
        // Для десктопов продолжаем использовать popup
        signInWithPopup(auth, provider)
            .then((result) => {
                onSuccess(result.user);
            })
            .catch((error) => {
                onError(error);
            });
    }
}

export function runCheckAuth() {
	// Обрабатываем результат после редиректа
	getRedirectResult(auth)
		.then((result) => {
			if (result) {
				onSuccess(result.user);
			} else {
				onNotLogged();
			}
		})
		.catch((error) => {
			onError(error);
		});
}

function onSuccess(user) {
	console.log(user);
	document.getElementById(TEXT.DOM_IDS.USER_NAME).innerHTML = user.displayName
	document.getElementById(TEXT.DOM_IDS.USER_PHOTO).src = user.photoURL
	document.getElementById(TEXT.DOM_IDS.LOGIN_BUTTON).style.display = "none";
	document.getElementById(TEXT.DOM_IDS.USER_INFO).style.display = "";

	updateState((prevState) => ({
		...prevState,
		isLoggedIn: true,
	}));

	updateBookingButtons();
}

function onNotLogged() {
	document.getElementById(TEXT.DOM_IDS.LOGIN_BUTTON).style.display = "";
}

function onError(error) {
	alert(TEXT.AUTH_ERROR_MESSAGE);
	console.log(error);
}