import {add, at, render} from './lib/css.js';
import {amendNode, clearNode} from './lib/dom.js';
import {div, li, ul} from './lib/html.js';
import pageLoad from './lib/load.js';
import checkbox from './checkbox.js';
import radio from './radio.js';
import sortHash from './sortHash.js';
import sortWord from './sortWord.js';

pageLoad.then(() => {
	const content = div("Please select a page to start");

	clearNode(document.body, [
		ul({"id": "tabs"}, [
			["Page 1", checkbox],
			["Page 2", radio],
			["Page 3", sortWord],
			["Page 4", sortHash]
		].map(([name, container]) => li({"onclick": function(this: HTMLLIElement) {
			amendNode(document.getElementsByClassName("tab_selected")[0], {"class": {"tab_selected": false}});
			amendNode(this, {"class": ["tab_selected"]});
			clearNode(content, container);
		}}, name))),
		content
	]);

	add("html, body", {
		"background-color": "#fff",
		"color": "#000",
		"margin": 0
	});

	add("#tabs", {
		"padding-left": 0,
		"line-height": "24px",
		"position": "relative",
		"width": "100%",
		"overflow": "hidden",
		"padding": "0 0 0 20px",
		"white-space": "nowrap",
		"user-select": "none",
		":after": {
			"position": "absolute",
			"content": `""`,
			"width": "100%",
			"bottom": 0,
			"left": 0,
			"border-bottom": "1px solid #000",
			"z-index": 1,
			"overflow": "hidden",
			"text-align": "center",
			"transform": "translateX(-20px)"
		},
		">li": {
			"border": "1px solid #000",
			"display": "inline-block",
			"position": "relative",
			"z-index": 1,
			"margin": "0 -5px",
			"padding": "0 20px",
			"border-top-right-radius": "6px",
			"border-top-left-radius": "6px",
			"background": "linear-gradient(to bottom, #ececec 50%, #d1d1d1 100%)",
			"box-shadow": "0 3px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #fff",
			"text-shadow": "0 1px #fff",
			":hover": {
				"background": "linear-gradient(to bottom, #faa 1%, #ffecec 50%, #d1d1d1 100%)",
				"cursor": "pointer",
				"outline": "none"
			},
			":before,:after": {
				"position": "absolute",
				"bottom": "-1px",
				"width": "6px",
				"height": "6px",
				"content": `" "`,
				"border": "1px solid #000"
			},
			":before": {
				"left": "-7px",
				"border-bottom-right-radius": "6px",
				"border-width": "0 1px 1px 0",
				"box-shadow": "2px 2px 0 #d1d1d1"
			},
			":after": {
				"right": "-7px",
				"border-bottom-left-radius": "6px",
				"border-width": "0 0 1px 1px",
				"box-shadow": "-2px 2px 0 #d1d1d1"
			},
			".tab_selected": {
				"border-bottom-color": "#fff",
				"z-index": 2,
				"background": "#fff !important",
				"cursor": "default !important",
				":before": {
					"box-shadow": "2px 2px 0 #fff"
				},
				":after": {
					"box-shadow": "-2px 2px 0 #fff"
				}
			}
		}
	});

	at("@media (prefers-color-scheme: dark)", {
		"html,body": {
			"background-color": "#000",
			"color": "#fff"
		},
		"ul#tabs": {
			":after": {
				"border-color": "#fff"
			},
			">li": {
				"background": "linear-gradient(to bottom, #777 50%, #111 100%)",
				"box-shadow": "0 3px 3px rgba(255, 255, 255, 0.4), inset 0 1px 0 #000",
				"text-shadow": "0 1px #000",
				"border-color": "#fff",
				":hover": {
					"background": "linear-gradient(to bottom, #f22 1%, #a77 50%, #111 100%)"
				},
				":before,:after": {
					"border-color": "#fff"
				},
				":before": {
					"box-shadow": "2px 2px 0 #2e2e2e"
				},
				":after": {
					"box-shadow": "-2px 2px 0 #2e2e2e"
				},
				".tab_selected": {
					"border-bottom-color": "#000",
					"background": "#000 !important",
					":before": {
						"box-shadow": "3px 2px 0 #000"
					},
					":after": {
						"box-shadow": "-2px 2px 0 #000"
					}
				}
			}
		}
	});

	add("th", {
		"user-select": "none"
	});

	amendNode(document.head, render());
});
