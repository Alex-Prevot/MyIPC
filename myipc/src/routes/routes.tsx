import { BrowserRouter, Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import HomePage from 'pages/home';
import LoginPage from 'pages/login';
import ConnectPage from 'pages/connect';

const Routes = (): JSX.Element => (
	<BrowserRouter>
		<RouterRoutes>
			<Route path="/" element={<HomePage />}/>
			<Route path="/connect" element={<ConnectPage />}/>
			<Route path="/login" element={<LoginPage />}/>
			<Route path="*" element={<Navigate replace to="/" />} />
		</RouterRoutes>
	</BrowserRouter>
);

export default Routes;