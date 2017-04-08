import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: ''
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const currentNodeId = this.props.note ? this.props.note._id : undefined;
		const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

		if (currentNodeId && currentNodeId !== prevNoteId) {
			this.setState({
				title: this.props.note.title,
				body: this.props.note.body
			});
		}
	}
	handleBodyChange(e) {
		const body = e.target.value;
		this.setState({ body });
		this.props.call('notes.update', this.props.note._id, { body });
	}
	handleNoteDelete(e) {
		this.props.call('notes.remove', this.props.note._id);
		this.props.browserHistory.push('/dashboard');
	}
	handleTitleChange(e) {
		const title = e.target.value;
		this.setState({ title });
		this.props.call('notes.update', this.props.note._id, { title });
	}
	render() {
		if (this.props.note) {
			return (
				<div className="editor">
					<input value={this.state.title}
						placeholder="Untitled Note"
						onChange={this.handleTitleChange.bind(this)}
					/>
					<textarea value={this.state.body}
						placeholder="Your note here"
						onChange={this.handleBodyChange.bind(this)}
					/>
					<button onClick={this.handleNoteDelete.bind(this)}>Delete Note</button>
				</div>
			);
		} else {
			return (
				<div className="editor">
					<p>
						{this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
					</p>
				</div>
			);
		}
	}
}

Editor.propTypes = {
	browserHistory: React.PropTypes.object.isRequired,
	call: React.PropTypes.func.isRequired,
	note: React.PropTypes.object,
	selectedNoteId: React.PropTypes.string
};

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId');

	return {
		browserHistory,
		call: Meteor.call,
		selectedNoteId,
		note: Notes.findOne(selectedNoteId)
	};
}, Editor);
