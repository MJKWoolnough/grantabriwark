import {useId, useState} from 'react';
import data from './data';

const hasSubtle = !!window.crypto.subtle,
      hashString = hasSubtle ? (str: string) => window.crypto.subtle.digest("SHA-1", new TextEncoder().encode(str)).then(d => {
	const data = new Uint8Array(d);
	let str = "";
	for (const a of Array.from(data)) {
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
      hashedData: [string, string][] = [],
      stringSort = new Intl.Collator().compare,
      Row = (params: {line: string; hash: string}) => (<tr><td>{params.hash}</td><td>{params.line}</td></tr>),
      SortHash = () => {
	const [hashSort, setHashSort] = useState(false),
	      id = useId();
	return (
		<div>
			<label htmlFor={id}>Sort by Hash</label><input type="checkbox" id={id} defaultChecked={hashSort} onClick={() => setHashSort(!hashSort)} />
			<table id="sortHash">
				<thead>
					<tr>
						<th>Hash ({hasSubtle ? "SHA-256" : "Custom Hash"})</th>
					</tr>
				</thead>
				<tbody>
					{hashedData.sort((a, b) => stringSort(a[+hashSort], b[+hashSort])).map(([line, hash]) => (<Row key={hash} hash={hash} line={line} />))}
				</tbody>
			</table>
		</div>
	);
      };

(async () => {
	for (const line of data.slice().sort(stringSort)) {
		hashedData.push([line, await hashString(line)]);
	}
})();

export default SortHash;
