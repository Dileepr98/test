import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/home';
import CreateLocation from './component/create-location';
import { SnackbarProvider } from 'notistack';
function App() {
	return (
		<div className="App">
			<SnackbarProvider
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				maxSnack={1}
				dense
				autoHideDuration={2000}
			>
				<Router basename="/">
					<Switch>
						<Route path="/create-location" component={CreateLocation} />
						<Route path="/" component={Home} />
					</Switch>
				</Router>
			</SnackbarProvider>
		</div>
	);
}

export default App;
