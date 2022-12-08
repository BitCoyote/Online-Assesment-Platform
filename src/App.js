import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Fragment} from "react";
import MainPageComponent from "./scripts/MainPageComponent";
import AssessmentComponent from "./scripts/AssessmentComponent";

const App = () => {

    console.log('app')

    return <div className="App">
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path='/main-page' component={MainPageComponent} exact={true}/>
                    <Route path='/assessment/:test_id' component={AssessmentComponent} exact={true}/>
                    <Route path='/get-results/:test_id' component={MainPageComponent} exact={true}/>
                    <Redirect to='/'/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    </div>
}

export default App;