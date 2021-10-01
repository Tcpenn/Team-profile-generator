const { expect } = require('@jest/globals');
const Employee = require('../lib/Employee')

test ('creates employee object', () => {
const employee = new Employee ('Tim', 1234, 'tim@team.com');

expect(employee.name).toBe('Tim');
expect(employee.id).toBe(1234);
expect(employee.email).toBe('tim@team.com');
});
