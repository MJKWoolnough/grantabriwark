import data from './data.js';

const hasSubtle = !!window.crypto.subtle,
      hashString = hasSubtle ? (str: string) => window.crypto.subtle.digest("SHA-1", new TextEncoder().encode(str)).then(d => {
	const data = new Uint8Array(d);
	let str = "";
        for (const a of data) {
		str += ("0" + a.toString(16)).slice(-2);
	}
	return str;
      }) : (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0;
	}
	if (hash < 0) {
		hash = 0xFFFFFFF - hash;
	}
	return hash.toString(16).padStart(8, "0");
      },
      stringSort = new Intl.Collator().compare,
      sortLine = (a: Element, b: Element) => stringSort(a.children[1]?.textContent ?? "", b.children[1]?.textContent ?? ""),
      sortHash = (a: Element, b: Element) => stringSort(a.children[0]?.textContent ?? "", b.children[0]?.textContent ?? ""),
      div = document.createElement("div"),
      label = div.appendChild(document.createElement("label")),
      input = div.appendChild(document.createElement("input")),
      table = div.appendChild(document.createElement("table")),
      thead = table.appendChild(document.createElement("thead")).appendChild(document.createElement("tr")),
      hashHead = thead.appendChild(document.createElement("th")),
      lineHead = thead.appendChild(document.createElement("th")),
      tbody = table.appendChild(document.createElement("tbody"));

table.setAttribute("id", "sortHash");

label.textContent = "Sort by Hash: ";
label.setAttribute("for", "sortHash");
input.setAttribute("type", "checkbox");
input.setAttribute("id", "sortHash");
input.addEventListener("click", () => tbody.append(...Array.from(tbody.children).sort(input.checked ? sortHash : sortLine)));

hashHead.textContent = `Hash (${hasSubtle ? "SHA-256" : "Custom Hash"})`;
lineHead.textContent = "Line";

for (const line of data.sort(stringSort)) {
	const tr = tbody.appendChild(document.createElement("tr")),
	      hash = tr.appendChild(document.createElement("td")),
	      l = tr.appendChild(document.createElement("td"));
	hash.textContent = await hashString(line);
	l.textContent = line;
}

export default div;
