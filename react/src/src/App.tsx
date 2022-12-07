import React, {MouseEventHandler, useState} from 'react';
import './App.css';
import Checkbox from './checkbox';
import Radio from './radio';
import SortWord from './sortWord';
import SortHash from './sortHash';

const MenuItem = (params: {className: string; onClick: MouseEventHandler<HTMLLIElement>, title: string}) =>  {
	return (
		<li className={params.className} onClick={params.onClick}>{params.title}</li>
	);
      },
      App = () => {
	const [selected, setSelected] = useState(-1);
	return (
		<div>
			<ul id="tabs">
				<MenuItem title="Page 1" className={selected === 0 ? "tab_selected" : ""} onClick={() => setSelected(0)} />
				<MenuItem title="Page 2" className={selected === 1 ? "tab_selected" : ""} onClick={() => setSelected(1)} />
				<MenuItem title="Page 3" className={selected === 2 ? "tab_selected" : ""} onClick={() => setSelected(2)} />
				<MenuItem title="Page 4" className={selected === 3 ? "tab_selected" : ""} onClick={() => setSelected(3)} />
			</ul>
			<div className={selected !== -1 ? "hidden" : ""}>Please select a page to start</div>
			<Checkbox hidden={selected !== 0} />
			<Radio hidden={selected !== 1} />
			<SortWord hidden={selected !== 2} />
			<SortHash hidden={selected !== 3} />
		</div>
	);
      };

export default App;
