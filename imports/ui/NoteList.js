import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import NoteListHeader from './NoteListHeader';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListItem from './NoteListItem';
import { Notes } from '../api/notes';

export const NoteList = props => {
	const renderList = () => {
		if (props.notes.length === 0) {
			return <NoteListEmptyItem/>;
		} else {
			return props.notes.map(note => <NoteListItem key={note._id} note={note}/>);
		}
	};
	return (
		<div>
			<NoteListHeader/>
			{ renderList() }
			NoteList { props.notes.length }
		</div>
	);
};

NoteList.propTypes = {
	notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
	Meteor.subscribe('notes');

	return {
		notes: Notes.find().fetch()
	};
}, NoteList);
