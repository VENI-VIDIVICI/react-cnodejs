import React from 'react'
import { BaseLayout } from './layouts'
import { GlobalStyle } from './style/global'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={ process.env.NODE_ENV !== 'production' ? '' : '/cnode' }>
        <GlobalStyle />

        <Switch>
          <Route path={'/'} component={BaseLayout} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
