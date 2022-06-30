// Import the built-in data types
import { DataTypes } from '@sequelize/core';
module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    id: {
      Type: Sequelize.UUID
    },
    title: {
      type: Sequelize.STRING
    },
    video_url: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published_status: {
      type: Sequelize.BOOLEAN
    },
    deleted_at: {
      type: Sequelize.DATEONLY
    }
  });

  return Tutorial;
};
