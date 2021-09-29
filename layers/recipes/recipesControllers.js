const { Router } = require('express');

const authMiddleware = require('../authentication/authMiddleware');
const recipesMiddlewares = require('./recipesMiddlewares');

const router = Router();

router.post('/',
authMiddleware.tokenValidation,
recipesMiddlewares.emptyFildValidation,
recipesMiddlewares.createRecipes,
async () => {});
/* REQUISIÇÃO:
// erick
http POST :3000/recipes/ name='miojo do erick' ingredients='macarrão, tempero' preparation='Esquenta a água e joga o tempero' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyODY3Mzk1LCJleHAiOjE2MzMwNDAxOTV9.s-fancsecjajN0Gy2aWLB9jOzVFRWoT3NRUqKyvs_vs"

# lucas
http POST :3000/recipes/ name='miojo do lucas' ingredients='macarrão, tempero' preparation='Esquenta a água e joga o tempero' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyODY5ODkxLCJleHAiOjE2MzMwNDI2OTF9.kylXNGEwGSkQy3vu6URsuhZ0mmmz8iKN4_mx3Aow4Zk"
*/

router.get('/',
recipesMiddlewares.getAllRecipes,
async () => {});
/* REQUISIÇÃO:
http GET :3000/recipes/
*/

router.get('/:id',
recipesMiddlewares.getRecipeById,
async () => {});
/* REQUISIÇÃO:
http GET :3000/recipes/614f93e9731b88de6cfb03e7
*/

router.put('/:id',
authMiddleware.tokenValidation,
recipesMiddlewares.emptyFildValidation,
recipesMiddlewares.updateRecipe,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
# user lucas
http PUT :3000/recipes/61538414085f8bc5067a9f4b name='miojo' ingredients='macarrão, tempero' preparation='Esquenta a água e joga o tempero' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyODY5ODkxLCJleHAiOjE2MzMwNDI2OTF9.kylXNGEwGSkQy3vu6URsuhZ0mmmz8iKN4_mx3Aow4Zk"

# admin user
http PUT :3000/recipes/61538414085f8bc5067a9f4b name='ovo' ingredients='ovo' preparation='ovo' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUyOWM1Y2I1YmMyOWVhZGZjMDRjMTQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyODA0MDU0LCJleHAiOjE2MzI5NzY4NTR9.30EV0N5emSH3l-4xk-HN062rOT0UwrQ_Ah3tjHnBEIo"
*/

router.delete('/:id',
authMiddleware.tokenValidation,
recipesMiddlewares.removeRecipe,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
# user lucas
http DELETE :3000/recipes/6153948d15b175e56ec1951f authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUzOTFiZjdiMmJjY2UxOTU0N2Y4ODQiLCJuYW1lIjoiTHVjYXMiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyODY3Mzk1LCJleHAiOjE2MzMwNDAxOTV9.s-fancsecjajN0Gy2aWLB9jOzVFRWoT3NRUqKyvs_vs"

# admin user
http DELETE :3000/recipes/6152976dce52fec6b4146d90 authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUyOWM1Y2I1YmMyOWVhZGZjMDRjMTQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyODA0MDU0LCJleHAiOjE2MzI5NzY4NTR9.30EV0N5emSH3l-4xk-HN062rOT0UwrQ_Ah3tjHnBEIo"
*/

module.exports = router;
