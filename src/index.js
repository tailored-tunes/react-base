import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</AppContainer>,
		document.getElementById('root')
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./components/App.jsx', () => {
		render(App);
	});
}
