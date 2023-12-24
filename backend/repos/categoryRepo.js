const { Sequelize, } = require('sequelize');
const { Category, } = require('../models');

async function createCategoriesIfDoNotExist(categories) {
    console.log('executing createCategoriesIfDoNotExist: ', categories);

    const existingCategories = await findExistingCategories(categories);

    const existingIdToCategory = {};
    existingCategories.forEach(category => existingIdToCategory[category.dataValues.Name] = category.dataValues);
    console.log('existingIdToCategory: ', existingIdToCategory);

    const categoriesToBeCreated = categories.filter(category => !existingIdToCategory[category.Name]);
    console.log('categoriesToBeCreated: ', categoriesToBeCreated);

    let res = [];
    if (categoriesToBeCreated?.length > 0) {
        const bulkCreateRes = await Category.bulkCreate(categoriesToBeCreated);
        console.log('bulkCreate res: ', bulkCreateRes);
        res = [...res, bulkCreateRes]
    }
    res = [...res, ...existingCategories];
    console.log('all categories: ', res);

    return res;
}

async function findExistingCategories(categories) {
    console.log('executing findExistingCategories: ', categories,);

    const params = {
        where: {
            Name: {
                [Sequelize.Op.in]: categories.map(category => category.Name),
            },
        },
    };
    console.log('params: ', JSON.stringify(params));

    const findAllRes = await Category.findAll(params);

    console.log('findAll res: ', findAllRes);

    return findAllRes;
}

module.exports = {
    createCategoriesIfDoNotExist: createCategoriesIfDoNotExist,
    findExistingCategories: findExistingCategories,
}
