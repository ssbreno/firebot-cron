import Knex from 'knex';

const knex = Knex({
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST || 'viaduct.proxy.rlwy.net',
    database: process.env.DB_DATABASE || 'railway',
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'xwcVSQlcykDghogXqDTbrrvqIueXFILY',
    port: Number(process.env.DB_PORT || 14821),
  },
});

export default knex;
