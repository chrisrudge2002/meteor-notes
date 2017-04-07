import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';

const authenticatedPages = ['/dashboard'];
const unauthenticatedPages = ['/', '/signup'];

const onEnterPublicPage = () => {
	if (Meteor.userId()) { browserHistory.replace('/dashboard'); }
};

const onEnterPrivatePage = () => {
	if (!Meteor.userId()) { browserHistory.replace('/'); }
};

const onEnterNotePage = nextState => {
	if (!Meteor.userId()) {
		browserHistory.replace('/');
	} else {
		Session.set('selectedNoteId', nextState.params.id);
	}
};

export const onAuthChange = isAuthenticated => {
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);

	if (isAuthenticatedPage && !isAuthenticated) {
		browserHistory.replace('/');
	} else if (isUnauthenticatedPage && isAuthenticated) {
		browserHistory.replace('/dashboard');
	}
};

export const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} onEnter={onEnterPublicPage}/>
		<Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
		<Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage}/>
		<Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
		<Route path="*" component={NotFound}/>
	</Router>
);

