module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": +process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": (process.env.DB_SYNC === 'true'),
    "logging": true,
    "entities": ["dist/**/entities/*.entity{.ts,.js}"],
    "migrations": [
        "src/migrations/*{.ts,.js}"
    ],
    "cli": {
        "entitiesDir": 'src/**/entities',
        "migrationsDir": "src/migrations"
    },
}