import React from 'react';

import Editor from './Editor';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default () => {
	return (
		<div>
			<PrivateHeader title="Dashboard"/>
			<div className="page-content">
				<div className="page-content__sidebar">
					<NoteList/>
				</div>
				<div className="page-content__main">
					<Editor/>
				</div>
			</div>
		</div>
	);
};
