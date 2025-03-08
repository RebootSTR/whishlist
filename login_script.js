import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase-config.js";  // Импортируем уже инициализированный auth

// Функция для входа через Google
export function runLogin() {
	const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
			onSuccess(result.user);
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

function onError(error) {
	alert("Ошибка входа");
}