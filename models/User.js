module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        ethBalance: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    });
};
