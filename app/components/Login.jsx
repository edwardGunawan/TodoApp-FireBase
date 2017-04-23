import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({
  onLogin(){
    var {dispatch} = this.props;
    dispatch(actions.startLogin()); // so user are able to login and connect it to the firebase
  },
  render() { // short cut render for es6
    return (
      <div>
        <h1 className="page-title"> TrackMe </h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth"> {/* callout-auth is a custom styles */}
              <h3> Login </h3>
              <p> Login with Github account below </p>
              <button onClick={this.onLogin} className="button"> Login with Github </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(Login);

// callout --> it is a box, to create a box around login widget so there will be a center in the screen with a nice border
