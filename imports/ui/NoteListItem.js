import moment from 'moment';
import React from 'react';

const NoteListItem = props => {
	return (
		<div>
			<h5>{ props.note.title || 'Untitled note'}</h5>
			<p>{ moment(props.note.updatedAt).format('DD/MM/YY') }</p>
		</div>
	);
};

NoteListItem.propTypes = {
	note: React.PropTypes.object.isRequired
};

export default NoteListItem;