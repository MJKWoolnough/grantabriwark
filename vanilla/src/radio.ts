import data from './data.js';

const radio = JSON.parse(window.localStorage.getItem("grantabriwark_radio") ?? "-1") as number,
      div = document.createElement("div"),
      ul = document.createElement("ul");

ul.setAttribute("id", "radioWords");

for (let i = 0; i < data.length; i++) {
	const n = i,
	      li = ul.appendChild(document.createElement("li")),
	      input = li.appendChild(document.createElement("input")),
	      label = li.appendChild(document.createElement("label"));
	input.addEventListener("click", () => window.localStorage.setItem("grantabriwark_radio", n + ""));
	input.setAttribute("type", "radio");
	input.toggleAttribute("checked", radio === n);
	input.setAttribute("name", "grantabriwark_radio");
	input.setAttribute("id", "radio_" + n);
	label.setAttribute("for", "radio_" + n);
	label.textContent = data[n];
}

div.append("Please check the line you like the best: ", ul);

export default div;
