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
		// Разделяем текст на строки
		const lines = text.split('\n');
		const summaryLines = [];
		const detailsLines = [];
		let isSummary = true;

		// Обрабатываем каждую строку
		for (const line of lines) {
			if (line.startsWith('<+')) {
				summaryLines.push(line.slice(2).trim());
			} else if (line.startsWith('<')) {
				isSummary = false;
				detailsLines.push(line.slice(1).trim());
			} else if (isSummary) {
				summaryLines.push(line.trim());
			} else {
				detailsLines.push(line.trim());
			}
		}

		// Обрабатываем строки с помощью marked
		const summaryHtml = marked.parseInline(summaryLines.join('<br>'), { renderer });
		const detailsHtml = marked.parseInline(detailsLines.join('<br>'), { renderer });

		// Формируем HTML
		const summary = `<summary>${summaryHtml}</summary>`;
		const details = `<div>${detailsHtml}</div>`;
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