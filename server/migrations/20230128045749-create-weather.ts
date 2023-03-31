'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: { createTable: (arg0: string, arg1: { id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; resolvedAddress: { type: any; allowNull: boolean; }; date: { type: any; allowNull: boolean; }; temperature_avg: { type: any; }; temperature_max: { type: any; }; temperature_min: { type: any; }; temperature_current: { type: any; }; humidity: { type: any; }; precipitation_prob: { type: any; }; precipitation_type: { type: any; }; wind_speed: { type: any; }; wind_direction: { type: any; }; visibility: { type: any; }; sunrise: { type: any; }; sunset: { type: any; }; uv_index: { type: any; }; weather_condition: { type: any; }; created_at: { allowNull: boolean; type: any; }; updated_at: { allowNull: boolean; type: any; }; }) => any; }, Sequelize: { INTEGER: any; STRING: any; DATE: any; DOUBLE: any; FLOAT: any; TIME: any; }) {
    await queryInterface.createTable('weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resolvedAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      temperature_avg: {
        type: Sequelize.INTEGER
      },
      temperature_max: {
        type: Sequelize.INTEGER
      },
      temperature_min: {
        type: Sequelize.INTEGER
      },
      temperature_current: {
        type: Sequelize.INTEGER
      },
      humidity: {
        type: Sequelize.DOUBLE
      },
      precipitation_prob: {
        type: Sequelize.FLOAT
      },
      precipitation_type: {
        type: Sequelize.STRING
      },
      wind_speed: {
        type: Sequelize.FLOAT
      },
      wind_direction: {
        type: Sequelize.FLOAT
      },
      visibility: {
        type: Sequelize.INTEGER
      },
      sunrise: {
        type: Sequelize.TIME
      },
      sunset: {
        type: Sequelize.TIME
      },
      uv_index: {
        type: Sequelize.FLOAT
      },
      weather_condition: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface: { dropTable: (arg0: string) => any; }, Sequelize: any) {
    await queryInterface.dropTable('weather');
  }
};