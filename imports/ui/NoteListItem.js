import moment from 'moment';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListItem = props => {
	return (
		<div onClick={() => { props.Session.set('selectedNoteId', props.note._id); }}>
			<h5>{ props.note.title || 'Untitled note'}</h5>
			{ props.note.selected ? 'selected' : undefined }
			<p>{ moment(props.note.updatedAt).format('DD/MM/YY') }</p>
		</div>
	);
};

NoteListItem.propTypes = {
	note: React.PropTypes.object.isRequired,
	Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
	return { Session };
}, NoteListItem);
