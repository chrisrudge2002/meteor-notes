import { mount } from 'enzyme';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import React from 'react';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
	describe('NoteListItem', function () {
		it('should render title and timestamp', function () {
			const title = 'My title here';
			const updatedAt = 1491496507234; // April 6th 2017 17:35 approx
			const wrapper = mount(<NoteListItem note={{ title, updatedAt }}/>);

			expect(wrapper.find('h5').text()).toBe(title);
			expect(wrapper.find('p').text()).toBe('06/04/17');
		});

		it('should set default title if no title set', function () {
			const title = '';
			const updatedAt = 1491496507234; // April 6th 2017 17:35 approx
			const wrapper = mount(<NoteListItem note={{ title, updatedAt }}/>);

			expect(wrapper.find('h5').text()).toBe('Untitled note');
		});
	});
}
