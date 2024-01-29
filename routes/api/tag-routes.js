//REVIEW ALL MANY TO MANY
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//All Tags REVIEW
router.get('/', async (req, res) => {
  // find all tags 
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_products'}],
      // attributes: {
      //   include: [
      //     [
      //      
      //       sequelize.literal(
      //         '(SELECT product_name FROM product WHERE product.tag_id = tag.id )'
      //       ),
      //       'product',
      //     ],
      //   ],
      // },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // be sure to include its associated Product data


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as:'tag_products'}],
      // attributes: {
      //   include: [
      //     [
      //       sequelize.literal(
      //         '(SELECT product_name FROM product WHERE product.tag_id = tag.id)'
      //       ),
      //       'product',
      //     ],
      //   ],
      // },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name,
    },
      {
        where: {
          id: req.params.id,
        },
      })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
