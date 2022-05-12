import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import ConnectPage from 'pages/connect';
import { UserContext } from './UserContext';
import React, { useMemo, useState } from 'react';


const Routes = (): JSX.Element => {

	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<RouterRoutes>
					<Route path="/" element={<HomePage />} />
					<Route path="/connect" element={<ConnectPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</RouterRoutes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default Routes;