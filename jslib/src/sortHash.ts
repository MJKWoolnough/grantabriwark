import {add} from './lib/css.js';
import {div, input, table, tbody, td, th, thead, tr} from './lib/html.js';
import {NodeArray, node, stringSort} from './lib/nodes.js';
import data from './data.js';
import {labels} from './shared.js';

type HashRow = {
	[node]: HTMLTableRowElement;
	line: string;
	hash: string;
}

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
	hash = 0x80000000 + hash;
	return hash.toString(16).padStart(8, "0");
      },
      sortLine = (a: HashRow, b: HashRow) => stringSort(a.line, b.line),
      sortHash = (a: HashRow, b: HashRow) => stringSort(a.hash, b.hash),
      rows = new NodeArray<HashRow>(tbody(), sortLine);

for (const line of data) {
	const hash = await hashString(line);
	rows.push({
		[node]: tr([
			td(hash),
			td(line)
		]),
		line,
		hash
	});
}

add("#sortHash td:first-child", {
	"font-family": "monospace"
});

export default div([
	labels("Sort by Hash: ", input({"type": "checkbox", "onclick": function(this: HTMLInputElement) {
		rows.sort(this.checked ? sortHash : sortLine);
	}})),
	table({"id": "sortHash"}, [
		thead(tr([
			th(`Hash (${hasSubtle ? "SHA-256" : "Custom Hash"})`),
			th("Line")
		])),
		rows[node]
	])
]);
