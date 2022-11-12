// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
//one to many relationship, each product can have one category, but every category can have multiple products

Product.hasMany(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});



// Categories have many Products

Category.belongsTo(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {

through: {
  model: ProductTag,
  unique: false,
},

  as: 'product_tag-identity'

});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {

  through: {
    model: ProductTag,
    unique: false,
  },
  
  as: 'tags_products'
});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
