import {add} from './lib/css.js';
import {amendNode} from './lib/dom.js';
import {table, tbody, td, th, thead, tr} from './lib/html.js';
import {NodeArray, node, noSort, stringSort} from './lib/nodes.js';
import data from './data.js';

type WordsRow = {
	[node]: HTMLTableRowElement;
	words: string[];
}

const split = data.map(l => l.split(" ")),
      maxWords = split.reduce((c, w) => Math.max(c, w.length), 0),
      rows = new NodeArray<WordsRow>(tbody(), noSort, split.map(words => ({
	[node]: tr([
		words.map(word => td(word)),
		Array.from({"length": maxWords - words.length}, () => td("-"))
	]),
	words
      })));

add("#sortWords th", {
	"cursor": "pointer",
	"user-select": "none",
	"padding-right": "1em",
	":hover": {
		"text-decoration": "underline"
	},
	".col_selected": {
		"background-repeat": "no-repeat",
		"background-position": "right 0 bottom 0",
		"background-size": "1em 1em",
		"background-image": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 20'%3E%3Cpath d='M1,1 h38 l-19,18 z' fill='%23f00' stroke='%23000' stroke-linejoin='round' /%3E%3C/svg%3E%0A")`,
		".reverse": {
			"background-image": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 20'%3E%3Cpath d='M1,19 h38 l-19,-18 z' fill='%23f00' stroke='%23000' stroke-linejoin='round' /%3E%3C/svg%3E%0A")`
		}
	}
});

export default table({"id": "sortWords"}, [
	thead(tr(Array.from({"length": maxWords}, (_, n) => th({"title": `Click to sort by word ${n+1}`, "onclick": function(this: HTMLTableCellElement) {
		if (this.classList.contains("col_selected")) {
			rows.reverse();
			this.classList.toggle("reverse");
		} else {
			amendNode(document.getElementsByClassName("col_selected")[0], {"class": {"col_selected": false}});
			amendNode(this, {"class": {"col_selected": true, "reverse": false}});
			rows.sort((a, b) => stringSort(a.words[n] ?? "", b.words[n] ?? ""));
		}
	}},`Word ${n+1}`)))),
	rows[node]
]);
