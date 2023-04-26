const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    Tag.findAll()
      .then((searchResponse) =>{
        res.json(searchResponse)
      })
    }
  catch(err){
    res.json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    Tag.findByPk(req.params.id)
    .then((searchResponse) => {
      res.json(searchResponse)
    })
  }
  catch (err)
  {res.json(err)}
});

router.post('/', (req, res) => {
  // create a new tag
  try{
    Tag.create(req.body)
    .then(() => {
      res.json(`Tag Created '${res.body.tag_name}'`)
    })}
    catch (err) {
      res.json(err)
    }
    
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.json(`Tag Updated`)
    })
  }
  catch (err){
    res.json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
  }
  catch (err){
    res.json(err)
  }
});

module.exports = router;
