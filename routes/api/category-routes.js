const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //calls all categories and waits for results
  try{
    const categoryData = await Category.findAll({
      include:[{ model: Product }],
      attributes:{
        include: [
          [
            //select names of products under the name products
            sequelize.literal(
              '(SELECT product_name FROM product WHERE product.category_id = category.id )'
            ),
            'products',
          ],
        ],
      },
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
