import { Sequelize, Options } from "sequelize";

export const db_sequelize_options_for_test: Options = {
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
  sync: { force: true },
};
