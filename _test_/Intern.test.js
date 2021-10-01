const { expect } = require('@jest/globals');
const Intern = require('../lib/Intern');

test('create intern object', () => {
    const intern = new Intern ('Tim',1235, 'tim@team.com', 'school');

    expect(intern.name).toBe('Tim');
    expect(intern.id).toBe(1235);
    expect(intern.email).toBe('tim@team.com');
    expect(intern.school).toBe('school');
});

test ("returns school name", () => {
    const intern = new Intern ('Tim',1235, 'tim@team.com', 'school')

    expect(intern.getSchool()).toBe('school')
});

test ('returns the intern role', () => {
    const intern = new Intern ('Tim',1235, 'tim@team.com', 'school')

    expect(intern.getRole()).toBe("Intern");
});