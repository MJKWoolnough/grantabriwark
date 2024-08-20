import data from './data.js';

const split = data.map(l => l.split(" ")),
      maxWords = split.reduce((c, w) => Math.max(c, w.length), 0),
      table = document.createElement("table"),
      thead = table.appendChild(document.createElement("thead")).appendChild(document.createElement("tr")),
      tbody = table.appendChild(document.createElement("tbody")),
      stringSort = new Intl.Collator().compare;

let sortNum = -1;

table.setAttribute("id", "sortWords");

thead.append(...Array.from({"length": maxWords}, (_, n) => {
	const th = document.createElement("th");

	th.textContent = "Word " + (n + 1);

	th.setAttribute("title", "Click to sort by word " + (n + 1));
	th.addEventListener("click", () => {
		if (sortNum !== n) {
			document.getElementsByClassName("col_selected")[0]?.classList.toggle("col_selected", false);
			th.classList.toggle("col_selected", true);
			th.classList.toggle("reverse", false);

			sortNum = n;

			tbody.append(...Array.from(tbody.children).sort((a, b) => stringSort(a.children[n]?.textContent ?? "", b.children[n]?.textContent ?? "")));
		} else {
			th.classList.toggle("reverse");
			tbody.append(...Array.from(tbody.children).reverse());
		}
	});

	return th;
}));

for (const words of split) {
	tbody.appendChild(document.createElement("tr")).append(...words.map(word => {
		const td = document.createElement("td");

		td.textContent = word;

		return td;
	}), ...Array.from({"length": maxWords - words.length}, () => {
		const td = document.createElement("td");

		td.textContent = "-";

		return td;
	}));
}

export default table;
