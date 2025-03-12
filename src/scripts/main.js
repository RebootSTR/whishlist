import { runLogin, runCheckAuth } from "./login_script.js";
import { runLoadMarkdown } from "./markdown_script.js";

export function signIn() {
    runLogin();
}

export function checkAuth() {
    runCheckAuth();
}

export function loadMarkdown() {
    runLoadMarkdown();
}