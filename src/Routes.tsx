import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import GetStarted from './components/GetStarted/GetStarted'
import Migrate from './components/Migrate/Migrate'

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={GetStarted} />
      <Route
        exact
        path="/ant"
        render={() => <Migrate conversionType="ANT" />}
      />
      <Redirect to="/" />
    </Switch>
  )
}
