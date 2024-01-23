const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//All categories
router.get('/', async (req, res) => {
  
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
            'product',
          ],
        ],
      },
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});
//All categories end

//Single category by id
router.get('/:id', async (req, res) => {
  
  try{
    const categoryData = await Category.findByPk(req.params.id,{
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

    if(!categoryData){
      res.status(404).json({message: 'No category found with that id'});
      return;
    }

    res.status(200).json(driverData);
  }catch (err) {
    res.status(500).json(err);
  }
});
//Single category end
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
