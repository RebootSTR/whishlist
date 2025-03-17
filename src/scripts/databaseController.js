import { getState } from "./state.js";
import { ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "../configs/firebase-config.js";

const BOOKINGS_PATH = "bookings";

export function getBookings() {
    const bookings = [];
    getUserBookingsRef().forEach((snapshot) => {
        bookings.push(snapshot.val());
    });
    return bookings;
}

export function addBooking(tag) {
    const ref = getUserBookingsRef();
    
    // Проверяем существование списка и добавляем запись
    readOnce(ref, (snapshot) => {
        console.log("booking snapshot:", snapshot);
        let bookings = [];
        if (snapshot.exists()) {
            bookings = snapshot.val();
        }
        // Проверяем наличие тега в списке
        if (!bookings.includes(tag)) {
            // Добавляем новую запись в массив только если её там нет
            bookings.push(tag);
            // Сохраняем обновленный массив
            set(ref, bookings);
        }
    });
}

function readOnce(ref, callback) {
    onValue(ref, (snapshot) => {
        callback(snapshot);
    }, { onlyOnce: true });
}

function checkAuth() {
    const state = getState();
    if (!state.isLoggedIn && state.userId != null) {
        throw new Error("User is not logged in");
    }
}

function getUserRef() {
    checkAuth();
    return ref(database, `users/${getState().userId}`);
}

function getUserBookingsRef() {
    checkAuth();
    return ref(database, `users/${getState().userId}/${BOOKINGS_PATH}`);
}

// Прослушиваем изменения в базе данных
onValue(ref(database), (snapshot) => { // todo: удалить   
    const data = snapshot.val();
    console.log("Снапшот базы данных:", data);
});