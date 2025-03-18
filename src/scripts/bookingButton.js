import * as TEXT from "../constants/text.js";
import { addBooking, removeBooking } from "./databaseController.js";
import { getState } from "./state.js";

export const bookingRegex = /\[booking:([^\]]+)\]/g;

const BookingButtonMode = {
    INACTIVE: "inactive",
    CANCEL: "cancel",
    BOOK: "book"
}

// Функция для создания HTML кнопки
export function createTagButton(tag) {
    const container = document.createElement('div');
    container.classList.add('booking-container');

    const infoField = document.createElement('span');
    infoField.classList.add('booking-info');
    infoField.style.display = 'none';
    container.appendChild(infoField);

    const button = document.createElement('button');
    button.classList.add('booking-button');
    button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_TAG, tag);
    button.textContent = TEXT.BOOKING_BUTTON_CAN_BOOK;
    container.appendChild(button);

    const isLoggedIn = getState().isLoggedIn;
    const bookedIds = getState().bookedIds;
    updateBookingButton(button, infoField, isLoggedIn, bookedIds);

    // Возвращаем элемент как текстовое представление
    return container.outerHTML;
}

export function updateBookingButtons() {
    const isLoggedIn = getState().isLoggedIn;
    const bookedIds = getState().bookedIds;

    document.querySelectorAll('.booking-container')
        .forEach(container => {
            const button = container.querySelector('.booking-button');
            const infoField = container.querySelector('.booking-info');
            updateBookingButton(button, infoField, isLoggedIn, bookedIds)
        });
}

function updateBookingButton(button, infoField, isLoggedIn, bookedIds) {
    if (!isLoggedIn) {
        setupInactiveButton(button, infoField);
        return;
    }
    const tag = button.getAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_TAG);
    const uid = getState().userId;

    if (bookedIds[tag] == uid) {
        setupMyBookingButton(button, infoField);
    } else if (bookedIds[tag] != null) {
        setupBookedButton(button, infoField);
    } else {
        setupCanBookButton(button, infoField);
    }
}

function setupInactiveButton(button, infoField) {
    setupCanBookButton(button, infoField);
    button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_MODE, BookingButtonMode.INACTIVE);
}

function setupCanBookButton(button, infoField) {
    button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_MODE, BookingButtonMode.BOOK);
    button.textContent = TEXT.BOOKING_BUTTON_CAN_BOOK;
    button.disabled = false;
    infoField.style.display = 'none';
}

function setupBookedButton(button, infoField) {
    button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_MODE, BookingButtonMode.BOOK);
    button.textContent = TEXT.BOOKING_BUTTON_BOOKED;
    button.disabled = true;
    infoField.style.display = 'none';
}

function setupMyBookingButton(button, infoField) {
    button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_MODE, BookingButtonMode.CANCEL);
    button.textContent = TEXT.BOOKING_BUTTON_REMOVE_BOOKING;
    button.disabled = false;
    infoField.style.display = '';
    infoField.textContent = TEXT.BOOKING_BUTTON_SELF_BOOKED;
}

export function addTagButtonListeners() {
    document.querySelectorAll('.booking-button')
        .forEach(button => button.addEventListener('click', handleBookingButtonClick));
}

// Функция для добавления обработчиков событий
export function handleBookingButtonClick(event) {
    const button = event.target;
    const mode = button.getAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_MODE);
    const tag = button.getAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_TAG);
    if (mode == BookingButtonMode.INACTIVE) {
        alert("Для бронирования необходимо авторизоваться");
        return
    } else if (mode == BookingButtonMode.BOOK) {
        addBooking(tag);
    } else if (mode == BookingButtonMode.CANCEL) {
        removeBooking(tag);
    }
}