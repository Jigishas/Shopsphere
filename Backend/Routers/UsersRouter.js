const router = require('express').Router();
const usersControllers = require('../controllers/userControllers');

router.get('/api/users', usersControllers.getusers);
router.post('/api/users', usersControllers.postusers);
router.delete('/api/users/:id', usersControllers.deleteusers);
router.put('/api/users/:id', usersControllers.putusers);
module.exports = router;
