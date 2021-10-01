const { expect } = require('@jest/globals');
const Manager = require('../lib/Manager');

test('creates a manager object', () => {
    const manager = new Manager('john', 1256, 'john@team.com', 1) 

    expect(manager.name).toBe('john');
    expect(manager.id).toBe(1256);
    expect(manager.email).toBe('john@team.com')
    expect(manager.officeNumber).toBe(1);
});

test ('returns the managers role', () => {
    const manager = new Manager('john,', 1256, 'john@team.com', 1);

    expect(manager.getRole()).toBe('Manager');
});