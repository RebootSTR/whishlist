// Функция для создания HTML кнопки
export function createTagButton(tag) {
    return `<button class="tag-button" data-tag="${tag}">${tag}</button>`;
}

export function addTagButtonListeners() {
    document.querySelectorAll('.tag-button')
        .forEach(button => button.addEventListener('click', handleTagButtonClick));
}

// Функция для добавления обработчиков событий
export function handleTagButtonClick(event) {
    const tag = event.target.getAttribute('data-tag');
    console.log(`Кликнута кнопка с тегом: ${tag}`);
}