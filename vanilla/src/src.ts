import checkbox from './checkbox.js';
import radio from './radio.js';
import sortWord from './sortWord.js';
import sortHash from './sortHash.js';

const content = document.createElement("div"),
      ul = document.createElement("ul");

content.textContent = "Please select a page to start";

ul.setAttribute("id", "tabs");

for (const [name, container] of [
	["Page 1", checkbox],
	["Page 2", radio],
	["Page 3", sortWord],
	["Page 4", sortHash]
] as const) {
	const li = ul.appendChild(document.createElement("li"));
	li.textContent = name;
	li.addEventListener("click", () => {
		document.getElementsByClassName("tab_selected")[0]?.classList.toggle("tab_selected", false);
		li.classList.toggle("tab_selected", true);
		content.replaceChildren(container);
	});
}

document.body.replaceChildren(ul, content);
