import data from './data.js';

const checked = JSON.parse(window.localStorage.getItem("grantabriwark_checked") ?? "[]") as boolean[],
      div = document.createElement("div"),
      ul = document.createElement("ul");

ul.setAttribute("id", "checkedWords");

for (let i = 0; i < data.length; i++) {
	const n = i,
	      li = ul.appendChild(document.createElement("li")),
	      input = li.appendChild(document.createElement("input")),
	      label = li.appendChild(document.createElement("label"));

	input.addEventListener("click", () => {
		checked[n] = input.checked;

		window.localStorage.setItem("grantabriwark_checked", JSON.stringify(checked));
	});

	input.setAttribute("type", "checkbox");
	input.toggleAttribute("checked", !!checked[n]);
	input.setAttribute("id", "checked_" + n);
	label.setAttribute("for", "checked_" + n);

	label.textContent = data[n];
}

div.append("Please check the lines you like: ", ul);

export default div;
