// REVIEW
const sequelize = require('sequelize')
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//All categories
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
      attributes: {
        include: [
          [
            //select names of products under the name products
            sequelize.literal(
              '(SELECT product_name FROM product WHERE product.category_id = category.id )'
            ),
            'product',
          ],
        ],
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
//All categories end

//Single category by id
router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT product_name FROM product WHERE product.category_id = category.id)'
            ),
            'product',
          ],
        ],
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
//Single category end

//Create new category
router.post('/', async (req, res) => {

  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create new category end

//Update category by id REVIEW copied to tag-routes message?
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name,
    },
      {
        where: {
          id: req.params.id,
        },
      })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});
//Update category by id end

//Delete category by id REVIEW copied to tag-routes
router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});
//Delete category by id end

module.exports = router;
