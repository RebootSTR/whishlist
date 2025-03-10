import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const githubUrl = "rebootstr.github.io"
const authPort = window.location.port ? `:${window.location.port}` : ''
const authHost = window.location.hostname.includes(githubUrl) ? githubUrl + "/whishlist" : window.location.hostname;

const firebaseConfig = {
    apiKey: "AIzaSyAC5Av_hHpt1wUmIteddGQcoxoDvzFidA4",
    authDomain: authHost + authPort,
    databaseURL: "https://whishlist-b3403-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "whishlist-b3403",
    storageBucket: "whishlist-b3403.firebasestorage.app",
    messagingSenderId: "1097970279939",
    appId: "1:1097970279939:web:5ea4322d28612f523b9036",
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Инициализируем Auth и сразу экспортируем
export const auth = getAuth(app);