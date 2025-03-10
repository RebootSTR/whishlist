import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "../configs/firebase-config.js";  // Импортируем уже инициализированный auth

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
	document.getElementById("userName").innerHTML = user.displayName
	document.getElementById("userPhoto").src = user.photoURL
	document.getElementById("loginButton").style.display = "none";
	document.getElementById("userInfo").style.display = "";
}

function onNotLogged() {
	document.getElementById("loginButton").style.display = "";
}

function onError(error) {
	alert("Ошибка входа");
	console.log(error);
}