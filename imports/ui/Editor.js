import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
	handleBodyChange(e) {
		this.props.call('notes.update', this.props.note._id, { body: e.target.value});
	}
	handleNoteDelete(e) {
		this.props.call('notes.remove', this.props.note._id);
	}
	handleTitleChange(e) {
		this.props.call('notes.update', this.props.note._id, { title: e.target.value});
	}
	render() {
		if (this.props.note) {
			return (
				<div>
					<input value={this.props.note.title}
					placeholder="Untitled Note"
					onChange={this.handleTitleChange.bind(this)}
					/>
					<textarea value={this.props.note.body}
					placeholder="Your note here"
					onChange={this.handleBodyChange.bind(this)}
					/>
					<button onClick={this.handleNoteDelete.bind(this)}>Delete Note</button>
				</div>
			);
		} else {
			return (
				<p>
					{this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
				</p>
			);
		}
	}
}

Editor.propTypes = {
	call: React.PropTypes.func.isRequired,
	note: React.PropTypes.object,
	selectedNoteId: React.PropTypes.string
};

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId');

	return {
		call: Meteor.call,
		selectedNoteId,
		note: Notes.findOne(selectedNoteId)
	};
}, Editor);
