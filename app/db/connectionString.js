var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/karaoke';

module.exports = connectionString;
