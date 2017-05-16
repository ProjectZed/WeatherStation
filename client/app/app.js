import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router';

// Each major browser view user interface must be imported.
import ErrorBanner from './components/errorbanner';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.WeatherStationError('Failure');
  }

  render() {
    return (
      <div>
        <ErrorBanner></ErrorBanner>
      </div>
    )
  }
}

ReactDOM.render((
  <App></App>
), document.getElementById('weather-station-main'));
