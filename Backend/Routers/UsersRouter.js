const router = require('express').Router();
const usersControllers = require('../controllers/userControllers');

router.get('/', usersControllers.getusers);
router.post('/signup', usersControllers.postusers);
router.delete('/:id', usersControllers.deleteusers);
router.put('/:id', usersControllers.putusers);



module.exports = router;
