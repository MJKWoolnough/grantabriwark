import {useState} from 'react';
import data from './data';

const split = data.map((l, id) => ({"words": l.split(" "), id})),
      maxWords = split.reduce((c, w) => Math.max(c, w.words.length), 0),
      stringSort = new Intl.Collator().compare,
      Row = (params: {words: string[]}) => (<tr>
	{params.words.map((word: string, n: number) => (<td key={n}>{word}</td>))}
	{Array.from({"length": maxWords - params.words.length}, () => (<td>-</td>))}
      </tr>),
      SortWord = () => {
	const [sortNum, setSortNum] = useState(-1),
	      [reverse, setReverse] = useState(false);
	return (
		<table id="sortWords">
			<thead>
				<tr>{Array.from({"length": maxWords}, (_, n) => (<th className={`${sortNum === n ? "col_selected" : ""} ${reverse ? "reverse" : ""}`} key={n} onClick={() => {
					if (sortNum === n) {
						setReverse(!reverse);
					} else {
						setSortNum(n);
						setReverse(false);
					}
				}}>Word {n+1}</th>))}</tr>
			</thead>
			<tbody>
				{split.slice().sort(sortNum === -1 ? () => 0 : (a, b) => stringSort(a.words[sortNum] ?? "", b.words[sortNum] ?? "") * (reverse ? -1 : 1)).map(({words, id}) => (<Row key={id} words={words} />))}
			</tbody>
		</table>
	);
      };

export default SortWord;
