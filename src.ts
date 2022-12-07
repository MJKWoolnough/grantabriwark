import {clearNode} from './lib/dom.js';
import {div, li, ul} from './lib/html.js';
import pageLoad from './lib/load.js';
import checkbox from './checkbox.js';
import radio from './radio.js';
import sortWord from './sortWord.js';
import sortHash from './sortHash.js';

pageLoad.then(() => {
	const content = div("Please select a page to start");
	clearNode(document.body, [
		ul({"id": "tabs"}, [
			["Page 1", checkbox],
			["Page 2", radio],
			["Page 3", sortWord],
			["Page 4", sortHash]
		].map(([name, container]) => li({"onclick": function(this: HTMLLIElement) {
			clearNode(content, container);
		}}, name))),
		content
	]);
});
