module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        Name: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.Note, { through: 'NoteCategory' });
    };

    return Category;
}
