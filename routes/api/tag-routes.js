const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);

  }
  catch(err){
    res.status(500).json(err);

  }
  // be sure to include its associated Category and Tag data
});
  

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk();
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
  // be sure to include its associated Category and Tag data
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const TagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
            tag_id,
          };
        });
        return Tag.bulkCreate(TagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(tag);
    })
    .then((TagIds) => res.status(200).json(TagIds))
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
    .then((tag) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        Tag.findAll({
          where: { tag_id: req.params.id }
        }).then((Tags) => {
          // create filtered list of new tag_ids
          const TagIds = Tags.map(({ tag_id }) => tag_id);
          const newTags = req.body.tagIds
          .filter((tag_id) => !TagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              tag_id: req.params.id,
              tag_id,
            };
          });
        });
      };
    });
  });
          


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
