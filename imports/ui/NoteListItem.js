import moment from 'moment';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListItem = props => {
	const className = props.note.selected ? 'item item--selected' : 'item';
	return (
		<div className={className} onClick={() => { props.Session.set('selectedNoteId', props.note._id); }}>
			<h5 className="item__title">{ props.note.title || 'Untitled note'}</h5>
			<p className="item__subtitle">{ moment(props.note.updatedAt).format('DD/MM/YY') }</p>
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
