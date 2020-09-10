import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    //load up client library when first rendered to screen
    componentDidMount() {
        //get callback after client:auth2 library loads to gapi
        window.gapi.load('client:auth2', () => {
            //init returns a promise (promise lets you know when client library has been initialized)
            window.gapi.client.init({
                clientId: '938713964030-hv36jh8hsr1dqqg5kbc98m6c8hvod3gn.apps.googleusercontent.com',
                scope: 'email'
                //arrow function in .then will automatically be invoked after library has been initialized.
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);

            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    //arrow function because it will be a callback function
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}
export default GoogleAuth;