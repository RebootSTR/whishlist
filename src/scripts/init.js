import { signIn, checkAuth, loadMarkdown } from './main.js';
import { resetState } from './state.js';

window.signIn = signIn;
resetState();

document.addEventListener('DOMContentLoaded', () => { loadMarkdown() });
document.addEventListener('DOMContentLoaded', () => { checkAuth() });
