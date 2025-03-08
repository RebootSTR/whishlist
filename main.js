import { runLogin } from "./login_script.js";
import { runLoadMarkdown } from "./markdown_scritpt.js";

export function signIn() {
    runLogin();
}
export function loadMarkdown() {
    runLoadMarkdown();
}