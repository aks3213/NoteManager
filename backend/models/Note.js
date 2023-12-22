module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("Note", {
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    });

    return Note;
}