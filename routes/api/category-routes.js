const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // Find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {model:Product}
    })

    if(!categoryData) {
      res.status(400).json({message:'Error with finding all category data'});
      return;
    }

    res.status(200).json(categoryData);

  } catch(err) {              
    res.status(500).json(err);
  }


});

// Find single category
router.get('/:id', async (req, res) => {
  
  try {
    const categoryIdData = await Category.findByPk(req.params.id, {
      include:{model: Product}
    })

    if(!categoryIdData) {
      res.status(400).json({message:'Unable to find category id'});
      return;
    }

    res.status(200).json(categoryIdData)

  } catch(err) {
    res.status(500).json(err);
  }

});

// Create a new category
router.post('/', (req, res) => {

  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
    
  .catch((err) => {
    res.status(400).json(err);
  });
});


// Update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

    .then((category) => res.json(category))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteIdData = await Category.destroy({
      where:{
        id:req.params.id
      }
    })
    
    if(!deleteIdData) {
      res.status(400).json({message: 'Unable to find Id'});
      return;
    }

    res.status(200).json(deleteIdData);

  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
