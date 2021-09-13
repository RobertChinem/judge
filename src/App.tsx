import React from 'react';
import Compiler from './Components/Compiler';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <div className="App container my-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-6 text-center">
                                <h1 className="mb-5">GRUB - Online Compiler</h1>
                                <Compiler />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path='/iframe' exact>
                    <Compiler />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
