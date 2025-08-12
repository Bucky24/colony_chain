import React, { useState, useEffect } from 'react';
import { Canvas, Text } from '@bucky24/react-canvas';

import styles from './styles.module.css';
import GameController from './controllers/game';
import { Route, Routes } from 'react-router-dom';
import GalaxyView from './views/GalaxyView';
import SystemView from './views/SystemView';
import PlanetView from './views/PlanetView';


export default function App() {
	const [size, setSize] = useState({ width: 0, height: 0 });

	const resize = () => {
		setSize({
			width: window.innerWidth,
			height: innerHeight,
		});
	}

	useEffect(() => {
		window.addEventListener("resize", resize);
		resize();

		GameController.newGame();

		return () => {
			window.removeEventListener("resize", resize);
		}
	}, []);

	return (<div className={styles.appRoot}>
		<Routes>
			<Route path="/" element={<GalaxyView />} />
			<Route path="/system/:id" element={<SystemView />} />
			<Route path="/system/:systemId/planet/:id" element={<PlanetView />} />
		</Routes>
	</div>);
}