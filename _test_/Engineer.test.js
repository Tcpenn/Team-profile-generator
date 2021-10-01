const { expect, test } = require('@jest/globals');
const Engineer = require ('../lib/Engineer');

test ('creates a engineer object', () => {
    const engineer = new Engineer ('Tim', 1233, 'tim@team.com', 'timGitHub');

    expect(engineer.name).toBe('Tim');
    expect(engineer.id).toBe(1233);
    expect(engineer.email).toBe('tim@team.com');
    expect(engineer.github).toBe('timGitHub');
});

test("returns engineer's github username", () => {
    const engineer = new Engineer('Tim', 1233, 'tim@team.com', 'timGitHub');

    expect(engineer.getGithub()).toBe('timGitHub');
});

test ("returns engineer's role", () => {
    const engineer = new Engineer ('Tim', 1233, 'tim@team.com', 'timGitHub');

    expect(engineer.getRole()).toBe('Engineer');
})