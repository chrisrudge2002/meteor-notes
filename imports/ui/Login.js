import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { Link } from 'react-router';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {error: ''};
	}
	onSubmit(e) {
		e.preventDefault();

		const email = this.refs.email.value.trim();
		const password = this.refs.password.value.trim();

		this.props.loginWithPassword({email}, password, err => {
			if (err) { this.setState({error: 'Unable to login. Check email and password.'}); }
			else { this.setState({error: ''}); }
		});
	}
	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Login</h1>

					{this.state.error ? <p>{this.state.error}</p> : undefined}

					<form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
						<input name="email" ref="email" type="email" placeholder="Email"/>
						<input name="password" ref="password" type="password" placeholder="Password"/>
						<button className="button">Login</button>
					</form>

					<Link to="/signup">Need an account?</Link>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginWithPassword: React.PropTypes.func.isRequired
};

export default createContainer(() => {
	return { loginWithPassword: Meteor.loginWithPassword };
}, Login);