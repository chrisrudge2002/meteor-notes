import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';

const onEnterNotePage = nextState => {
	Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = nextState => {
	Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
	const isAuthenticatedPage = (currentPagePrivacy === 'auth');
	const isUnauthenticatedPage = (currentPagePrivacy === 'unauth');

	if (isAuthenticatedPage && !isAuthenticated) {
		browserHistory.replace('/');
	} else if (isUnauthenticatedPage && isAuthenticated) {
		browserHistory.replace('/dashboard');
	}
};

export const globalOnChange = (prevState, nextState) => {
	globalOnEnter(nextState);
};

export const globalOnEnter = nextState => {
	const lastRoute = nextState.routes[nextState.routes.length - 1];
	Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const routes = (
	<Router history={browserHistory}>
		<Route onChange={globalOnChange} onEnter={globalOnEnter}>
			<Route path="/" component={Login} privacy="unauth"/>
			<Route path="/dashboard" component={Dashboard} privacy="auth"/>
			<Route path="/dashboard/:id" component={Dashboard} privacy="auth" 
				onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
			<Route path="/signup" component={Signup} privacy="unauth"/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);

