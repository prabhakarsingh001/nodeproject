const express = require('express');
const router = express.Router();
router.post('/shloka/create', requireSignin, adminMiddleware, validateShlokaRequest, isRequestValidated, addShloka);
router.patch('/shloka/update', requireSignin, adminMiddleware, updateShloka);
router.get('/shloka/get', getShloka);
router.post('/shloka/getById', getShlokaById);
router.delete('/shloka/delete', requireSignin, adminMiddleware, deleteShloka);
module.exports = router;