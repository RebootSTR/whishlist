import { signIn, loadMarkdown } from './main.js';

window.signIn = signIn;

document.addEventListener('DOMContentLoaded', () => { loadMarkdown() });