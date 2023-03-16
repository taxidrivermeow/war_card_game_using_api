import React, {Component} from 'react';

class LoginPage extends Component {
    render() {
        return (
            <div className="login-page">
                <h1 className="title">Ready for WAR?</h1>
                <input className="name-input"
                       type="text"
                       placeholder="Enter your name"
                       onChange={this.props.setName}
                />
                <button className="start-btn"
                        onClick={this.props.checkName}
                >Start</button>
            </div>
        );
    }
}

export default LoginPage;