import { mount } from 'enzyme';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import React from 'react';

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
	describe('PrivateHeader', function () {
		it('should set button text to logout', function () {
			const wrapper = mount(<PrivateHeader title="Test title" handleLogout={() => {}}/>);
			const buttonText = wrapper.find('button').text();

			expect(buttonText).toBe('Logout');
		});

		it('should use title prop as h1 text', function () {
			const title = 'Test title here';
			const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}}/>);
			const actualTitle = wrapper.find('h1').text();

			expect(actualTitle).toBe(title);
		});

		it('should call handleLogout on logout button click', function () {
			const spy = expect.createSpy();
			const wrapper = mount(<PrivateHeader title="Test title" handleLogout={spy}/>);
			wrapper.find('button').simulate('click');

			expect(spy).toHaveBeenCalled();
		});
	});
}
