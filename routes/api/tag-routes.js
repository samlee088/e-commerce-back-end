const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
router.get('/', async (req, res) => {
  try{
    const tagsData = await Tag.findAll(
      {include: [{model:Product, through: ProductTag}]}
    )

    if(!tagsData) {
      res.status(400).json({message:'Unable to grab all tags'});
      return;
    }

    res.status(200).json(tagsData);

  } catch(err) {
    res.status(500).json(err);
  }
});

// Find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagIdData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    });

    if(!tagIdData) {
      res.status(500).json({message:"Unable to find tag by id"});
      return;
    }

    res.status(200).json(tagIdData);

  } catch(err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((Tag) => res.status(200).json(Tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


 // Update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {

  try{
    const deleteId = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!deleteId) {
      res.status(400).json({message:'Unable to find id'});
      return;
    }

    res.status(200).json(deleteId);

  } catch(err) {
    res.status(500).json(err)
  }

});

module.exports = router;
