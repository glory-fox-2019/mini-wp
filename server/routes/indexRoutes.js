const router = require('express').Router();
const userRoutes = require('../routes/userRoutes');
const articleRoutes = require('../routes/articleRoutes');

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
