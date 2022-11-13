const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
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

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
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

router.post('/', (req, res) => {
  // create a new category

  Category.create(req.body)
  .then((category) => {
      
      res.status(200).json(category);
    })
    
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


  // update a category by its `id` value
  
router.put('/:id', (req, res) => {
  // update product data
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


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

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
