const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    Category.findAll()
    .then((searchResponse) => {
      response.json(searchResponse)
    })
  }
  catch (error){
  console.log(error);
  res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
    });
    res.status(200).json(category);
  }
    catch (err) {
      res.json(err)
    }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    Category.create(req.body)
    .then(() => {
    res.json(`Created Category ${req.body.category_name}`)})
  }
  catch (err) {res.json(err)};
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {id: req.params.id}
    });
    res.status(200).json(`Category Updated ${req.body.category_name}`)
    }
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const DelCategory = await Category.destroy({ where: { id: req.params.id}});
    res.status(200).json(DelCategory)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
