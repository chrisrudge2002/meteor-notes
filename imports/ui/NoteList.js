import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { Session } from 'meteor/session';

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
		<div className="item-list">
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
	const selectedNoteId = Session.get('selectedNoteId');
	Meteor.subscribe('notes');

	return {
		notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map(note => {
			return { ...note, selected: (note._id === selectedNoteId)};
		})
	};
}, NoteList);
