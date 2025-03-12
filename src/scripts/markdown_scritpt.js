import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
import { createTagButton, addTagButtonListeners } from './tagButton.js';
import * as TEXT from "../constants/text.js";

// Настраиваем пользовательский рендерер
const renderer = new marked.Renderer();

// Добавляем обработку пользовательского синтаксиса
renderer.paragraph = function(obj) {
	// Извлекаем текст из объекта
	const text = obj.text;

	// Обработка синтаксиса для <details> и <summary>
	if (text.startsWith('<+')) {
		// Собираем строки для summary
		const summaryLines = [];
		let currentText = text;
		while (currentText.startsWith('<+')) {
			summaryLines.push(currentText.slice(2).trim());
			const nextObj = this.next();
			currentText = nextObj ? nextObj.text : '';
		}
		
		// Собираем строки для details
		const detailsLines = [];
		while (currentText.startsWith('<')) {
			detailsLines.push(currentText.slice(1).trim());
			const nextObj = this.next();
			currentText = nextObj ? nextObj.text : '';
		}
		
		// Формируем HTML
		const summary = `<summary>${summaryLines.join('<br>')}</summary>`;
		const details = `<div>${detailsLines.join('<br>')}</div>`;
		return `<details>${summary}${details}</details>`;
	}
	
	// Стандартная обработка параграфа
	return `<p>${text}</p>`;
};

export async function runLoadMarkdown() {
	try {
		const response = await fetch(TEXT.MARKDOWN_CONTENT_URL);
		const markdownText = await response.text();
		const htmlContent = marked.parse(markdownText, { renderer });
		document.getElementById(TEXT.DOM_IDS.MARKDOWN_CONTENT).innerHTML = htmlContent;
		
		// Добавляем обработчики событий для кнопок
		addTagButtonListeners();
	} catch (error) {
		console.error('Ошибка при загрузке Markdown:', error);
		document.getElementById(TEXT.DOM_IDS.MARKDOWN_CONTENT).innerHTML = `<p>${TEXT.CONTENT_LOAD_ERROR_MESSAGE}</p>`;
	}
}