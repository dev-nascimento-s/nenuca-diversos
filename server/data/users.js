const bcrypt = require('bcryptjs');

// Hash password manually or let the model presave handle it? 
// The model has a pre-save hook, but insertMany might bypass it depending on how it's called.
// Mongoose insertMany DOES NOT trigger pre('save') hooks.
// So we need to hash it here or use create() loop.
// For simplicity, I will use a pre-hashed password for '123456' or simple loop in seeder.

// Actually, I'll update seeder.js to use create or just hash here.
// Hash for '123456' is roughly: $2a$10$3.rM.D3s... (random salt).
// Easier to just update seeder.js to use loop or let me hardcode a known hash.
// $2a$10$X7.1x1.1x1.1x1.1x1.1x1 is not valid.

// Let's modify seeder.js to use create() so hooks run, OR just hash it programmatically in seeder.

const users = [
    {
        name: 'Admin User',
        email: 'admin@nenuca.com',
        password: 'password123', // Will be hashed if I change seeder, or I need to hash it
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

module.exports = users;
