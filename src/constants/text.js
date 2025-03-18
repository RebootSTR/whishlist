// Тексты для аутентификации
export const AUTH_ERROR_MESSAGE = "Ошибка входа";

// Тексты для загрузки контента
export const CONTENT_LOAD_ERROR_MESSAGE = "Не удалось загрузить контент.";

// URL для загрузки markdown
export const MARKDOWN_CONTENT_URL = "https://raw.githubusercontent.com/RebootSTR/whishlist/refs/heads/master/whishlist.md";
export const LOCAL_MARKDOWN_CONTENT_URL = `${window.location.origin}/configs/local_whishlist.md`;

export const BOOKING_BUTTON_CAN_BOOK = "Забронировать";
export const BOOKING_BUTTON_BOOKED = "Подарок забронирован";
export const BOOKING_BUTTON_SELF_BOOKED = "Вы забронировали подарок";
export const BOOKING_BUTTON_REMOVE_BOOKING = "Снять бронь";

// ID элементов DOM
export const DOM_IDS = {
    USER_NAME: "userName",
    USER_PHOTO: "userPhoto",
    LOGIN_BUTTON: "loginButton",
    USER_INFO: "userInfo",
    MARKDOWN_CONTENT: "markdownContent",
    BOOKING_BUTTON_TAG: "data-tag",
    BOOKING_BUTTON_MODE: "data-mode"
}; 