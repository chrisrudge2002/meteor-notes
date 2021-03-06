import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './users';

if (Meteor.isServer) {
	describe('users', function () {
		it('should allow valid email addresses', function() {
			const testUser = { emails: [ { address: 'Test@example.com' } ] };
			const res = validateNewUser(testUser);

			expect(res).toBe(true);
		});

		it('should reject invalid email addresses', function() {
			const testUser1 = { emails: [ { address: 'Testom' } ] };

			expect(() => { validateNewUser(testUser1); }).toThrow();
		});
	});
}
