import {add} from './lib/css.js';
import {div, input, li, ul} from './lib/html.js';
import {IntSetting} from './lib/settings.js';
import data from './data.js';
import {labels} from './shared.js';

const radio = new IntSetting("grantabriwark_radio", -1);

add("#radioWords", {
	"padding": 0,
	"list-style": "none"
});

export default div([
	"Please select the line you like the best: ",
	ul({"id": "radioWords"}, data.map((line, n) => li(labels(input({"type": "radio", "name": "grantabriwark_radio", "checked": radio.value === n, "onclick": function(this: HTMLInputElement) {
		if (this.checked) {
			radio.set(n);
		}
	}}), line))))
]);

