module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    video_url: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published_status: {
      type: Sequelize.BOOLEAN,
      //allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATEONLY
    }
  });

  return Tutorial;
};
