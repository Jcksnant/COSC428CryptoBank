module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Transaction", {
        type: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        status: DataTypes.STRING,
        hash: DataTypes.STRING
    });
};
