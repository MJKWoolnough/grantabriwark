import {add} from './lib/css.js';
import {div, input, li, ul} from './lib/html.js';
import {JSONSetting} from './lib/settings.js';
import data from './data.js';
import {labels} from './shared.js';

const checked = new JSONSetting("grantabriwark_checked", data.map(() => false), (v: any): v is boolean[] => v instanceof Array && v.every(b => typeof b === "boolean"));

add("#checkedWords", {
	"padding": 0,
	"list-style": "none"
});

export default div([
	"Please check the lines you like: ",
	ul({"id": "checkedWords"}, data.map((line, n) => li(labels(input({"type": "checkbox", "checked": checked.value[n], "onchange": function(this: HTMLInputElement) {
		checked.value[n] = this.checked;
		checked.set(checked.value);
	}}), line))))
]);

