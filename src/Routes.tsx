import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import GetStarted from './components/GetStarted/GetStarted'
import Migrate from './components/Migrate/Migrate'

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from="/" to="/get-started" />
      <Route exact path="/get-started" component={GetStarted} />
      <Route exact path="/migrate" component={Migrate} />
      <Redirect to="/get-started" />
    </Switch>
  )
}
