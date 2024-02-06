const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try { 
    const categoryData = await Location.findAll();
    res.status(200).json(categoryData);
  }
  catch (err){
    res.status(200).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Location.findByPk();
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((product) => {
      
      if (req.body.tagIds.length) {
        const categoryTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            category_id: category.id,
            tag_id,
          };
        });
        
      }
    });
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
})
    .then((category) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        CategoryTag.findAll({
          where: { category_id: req.params.id }
        }).then((categoryTags) => {
          // create filtered list of new tag_ids
          const categoryTagIds = productTags.map(({ tag_id }) => tag_id);
          const newcategoryTags = req.body.tagIds
          .filter((tag_id) => !categoryTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              category_id: req.params.id,
              tag_id,
            };
          });
        });
      };
    });
          
          
    
      


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
