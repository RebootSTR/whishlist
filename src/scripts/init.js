import { signIn, checkAuth, loadMarkdown } from './main.js';

window.signIn = signIn;

document.addEventListener('DOMContentLoaded', () => { loadMarkdown() });
document.addEventListener('DOMContentLoaded', () => { checkAuth() });
