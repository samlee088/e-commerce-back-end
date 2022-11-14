// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//One to Many Relationship
//Each product can have one category, but every category can have multiple products

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});


Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

//Many to Many relationship
// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {

through: {
  model: ProductTag,
  unique: false,
},

  foreignKey: 'product_id'

});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {

  through: {
    model: ProductTag,
    unique: false,
  },
  
  foreignKey: 'tag_id'

});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
