import { getState, updateState } from "./state.js";
import { ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { database } from "../configs/firebase-config.js";
import { updateBookingButtons } from "./bookingButton.js";

const BOOKINGS_PATH = "bookings";
const USERS_PATH = "users";

let unsubscribeBookings = null;

export function getBookings() {
    const bookings = [];
    getUserBookingsRef().forEach((snapshot) => {
        bookings.push(snapshot.val());
    });
    return bookings;
}

export function removeBooking(tag) {
    const ref = getUserBookingsRef();
    readOnce(ref, (snapshot) => {
        const bookings = snapshot.val();
        set(ref, bookings.filter(booking => booking !== tag));
    });
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

function getUserBookingsRef() {
    checkAuth();
    return ref(database, `${USERS_PATH}/${getState().userId}/${BOOKINGS_PATH}`);
}

function handleBookings(snapshot) {
    const data = snapshot.val();

    console.log("Снапшот базы данных:", data);
    
    const bookedIds = {};
    
    // Проходим по всем пользователям
    if (data && data.users) {
        Object.entries(data.users).forEach(([userId, userData]) => {
            // Проверяем наличие бронирований у пользователя
            if (userData && userData.bookings) {
                // Для каждого бронирования создаем запись в результате
                userData.bookings.forEach(booking => {
                    bookedIds[booking] = userId;
                });
            }
        });
    }

    updateState((prevState) => ({
		...prevState,
		bookedIds: bookedIds
	}));

    updateBookingButtons();
}

export function startBookingsListener() {
    // Если уже есть активная подписка, отменяем её
    if (unsubscribeBookings) {
        unsubscribeBookings();
    }
    
    // Создаем новую подписку и сохраняем функцию отмены
    unsubscribeBookings = onValue(ref(database), (snapshot) => { handleBookings(snapshot) });
}

// Запускаем прослушивание при инициализации
startBookingsListener();