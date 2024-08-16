{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "password",
    "database": "payments",
    "entities": ["src/**/*.entity{.ts,.js}"],
    "synchronize": false,
    "migrationsTableName": "migrations",
    "migrations": ["src/database/migrations/*.ts"],
    "cli": {
      "migrationsDir": "src/database/migrations"
    }
  }
  