import {useId} from 'react';
import data from './data';

let radio = JSON.parse(window.localStorage.getItem("grantabriwark_radio") ?? "-1");

const RadioLine = (params: {num: number; line: string}) => {
	const id = useId();

	return (
		<li><input type="radio" name="grantabriwark_radio" defaultChecked={radio === params.num} id={id} onClick={() => {radio = params.num; window.localStorage.setItem("grantabriwark_radio", radio)}} /><label htmlFor={id}>{params.line}</label></li>
	);
      },
      Radio = () => {
	return (
		<div>
			Please check the line you like the best:
			<ul id="radioWords">
				{data.map((line, n) => (<RadioLine key={"radio_" + n} num={n} line={line} />))}
			</ul>
		</div>
	);
      };

export default Radio;
