
// Функция для обновления состояния с помощью колбэка
export function updateState(updater) {
  if (typeof updater === 'function') {
    window.pageState = updater(window.pageState);
  } else {
    console.error('updater must be a function');
  }
}

// Функция для получения состояния
export function getState() {
  return window.pageState;
} 