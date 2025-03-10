import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

export async function runLoadMarkdown() {
	const url = "https://raw.githubusercontent.com/RebootSTR/whishlist/refs/heads/master/whishlist.md";
	try {
		const response = await fetch(url);
		const markdownText = await response.text();
		const htmlContent = marked.parse(markdownText); // Преобразуем Markdown в HTML
		document.getElementById('markdownContent').innerHTML = htmlContent;
	} catch (error) {
		console.error('Ошибка при загрузке Markdown:', error);
		document.getElementById('markdownContent').innerHTML = '<p>Не удалось загрузить контент.</p>';
	}
}