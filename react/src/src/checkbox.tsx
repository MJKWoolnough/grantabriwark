import {useId} from 'react';
import data from './data';

const checked = JSON.parse(window.localStorage.getItem("grantabriwark_checked") ?? "[]"),
      CheckLine = (params: {checked: boolean, num: number, line: string}) => {
	const id = useId();
	return (
		<li><input type="checkbox" defaultChecked={params.checked} id={"check_" + id} onClick={() => {checked[params.num] = !checked[params.num]; window.localStorage.setItem("grantabriwark_checked", JSON.stringify(checked))}} /><label htmlFor={"check_" + id}>{params.line}</label></li>
	);
      },
      Checkbox = () => {
	return (
		<div>
			Please check the lines you like:
			<ul id="checkedWords">
				{data.map((line, n) => (<CheckLine checked={checked[n] ?? false} key={"check_" + n} num={n} line={line} />))}
			</ul>
		</div>
	);
      };

export default Checkbox;
