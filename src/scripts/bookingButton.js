import * as TEXT from "../constants/text.js";
import { addBooking } from "./databaseController.js";

export const bookingRegex = /\[booking:([^\]]+)\]/g;

// Функция для создания HTML кнопки
export function createTagButton(tag) {
    const button = document.createElement('button');
    button.classList.add('booking-button');
    button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_TAG, tag);
    button.textContent = TEXT.BOOKING_TAG_BUTTON_TEXT;
    
    updateBookingButton(button);

    // Возвращаем элемент как текстовое представление
    return button.outerHTML;
}

export function updateBookingButtons() {
    document.querySelectorAll('.booking-button')
        .forEach(button => updateBookingButton(button));
}

function updateBookingButton(button) {
    if (!pageState.isLoggedIn) {
        button.setAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_INACTIVE, "");
    } else {
        button.removeAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_INACTIVE);
    }
}

export function addTagButtonListeners() {
    document.querySelectorAll('.booking-button')
        .forEach(button => button.addEventListener('click', handleBookingButtonClick));
}

// Функция для добавления обработчиков событий
export function handleBookingButtonClick(event) {
    const tag = event.target.getAttribute(TEXT.DOM_IDS.BOOKING_BUTTON_TAG);
    if (tag === null) {
        alert("Для бронирования необходимо авторизоваться");
        return
    }
    alert(`Кликнута кнопка с тегом: ${tag}`);
    addBooking(tag);
}