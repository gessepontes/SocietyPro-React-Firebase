import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "../containers/pages/HomePage";
import LoginPage from "../containers/pages/LoginPage";
import DashboardPage from "../containers/pages/DashboardPage";
import PlayerList from "../containers/player/PlayerList";
import Player from "../containers/player/Player";
import Team from "../containers/team/Team";
import TeamList from "../containers/team/TeamList";
import Field from "../containers/field/Field";
import FieldList from "../containers/field/FieldList";
import FieldTime from "../containers/field/FieldTime";
import FieldSchedules from "../containers/field/FieldSchedules";
import FieldTicket from "../containers/field/FieldTicket";
import PreInscription from "../containers/championship/pre-inscription/PreInscriptionList";
import PlayerInscription from "../containers/championship/player/PlayerInscription";
import PlayerInscriptionList from "../containers/championship/player/PlayerInscriptionList";
import MatchReportList from "../containers/championship/match-report/MatchReportList";
import Person from "../containers/person/Person";
import FieldAdd from "../containers/field/FieldAdd";
import FieldItem from "../containers/field-item/FieldItem";
import FieldItemList from "../containers/field-item/FieldItemList";

const Routes = () => (

  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/person" component={Person} />
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/player/:id" component={Player} />
    <Route path="/player" component={Player} exec />
    <Route path="/player-list" component={PlayerList} />
    <Route path="/team/:id" component={Team} />
    <Route path="/team" component={Team} exact />
    <Route path="/team-list" component={TeamList} />
    <Route path="/field" component={Field} />
    <Route path="/field-list" component={FieldList} />
    <Route path="/field-item-list" component={FieldItemList} />
    <Route path="/field-item/:id" component={FieldItem} />    
    <Route path="/field-item/" component={FieldItem} />
    <Route path="/field-time" component={FieldTime} />
    <Route path="/field-schedules" component={FieldSchedules} />
    <Route path="/field-ticket" component={FieldTicket} />
    <Route path="/field-add" component={FieldAdd} />
    <Route path="/pre-inscription" component={PreInscription} />
    <Route path="/player-inscription" component={PlayerInscription} />
    <Route path="/player-inscription-list" component={PlayerInscriptionList} />
    <Route path="/match-report-list" component={MatchReportList} />
    <Route path="/suspended-players-list" component={MatchReportList} />
  </Switch>
);

export default Routes;