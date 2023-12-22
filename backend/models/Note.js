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
        },
        IsArchived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return Note;
}