import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Check from './components/Check/Check'
import TermsAndConditions from './components/Terms/Terms'
import GetStarted from './components/GetStarted/GetStarted'
import Migrate from './components/Migrate/Migrate'
import RedeemAntV2Eth from './components/Migrate/RedeemAntV2Eth'

export const CONVERTER_PATH = '/converter'
export const REDEEM_ANJ_PATH = '/redeem-anj'
export const REDEEM_ANTV2_PATH = '/redeem-antv2'
export const TERMS_AND_CONDITIONS_PATH = '/terms'
export const GOVERN_PATH = '/governReward'

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={GetStarted} />
      <Route
        exact
        path={TERMS_AND_CONDITIONS_PATH}
        component={TermsAndConditions}
      />
      <Route
        exact
        path={CONVERTER_PATH}
        render={() => <Migrate conversionType="ANT" />}
      />
      <Route exact path={GOVERN_PATH} render={() => <Check />} />
      <Route
        exact
        path={REDEEM_ANJ_PATH}
        render={() => <Migrate conversionType="ANJ" />}
      />
      <Route exact path={REDEEM_ANTV2_PATH} render={() => <RedeemAntV2Eth />} />
      <Redirect to="/" />
    </Switch>
  )
}
