import { signIn, checkAuth, loadMarkdown } from './main.js';

window.signIn = signIn;
window.pageState = {
    isLoggedIn: false,
};

document.addEventListener('DOMContentLoaded', () => { loadMarkdown() });
document.addEventListener('DOMContentLoaded', () => { checkAuth() });
