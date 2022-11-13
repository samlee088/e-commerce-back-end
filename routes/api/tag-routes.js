const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
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

router.post('/', (req, res) => {
  // create a new tag
  
  Tag.create(req.body)
    .then((Tag) => res.status(200).json(Tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});



router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
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


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
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
