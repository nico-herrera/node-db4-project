const db = require('../../data/db-config')

// select recipe_name, step_number, step_instructions, ing.ingredient_id, quantity 
// from recipes as r
// join steps as st
// on st.recipe_id = r.recipe_id
// join ingredients as ing
// join recipes_ingredients as rec_ing
// where r.recipe_id = 1

module.exports = {
    findById: async (recipe_id) => {
       const recipe = await db.select('recipe_name', 'step_number', 'step_instructions', 'ing.ingredient_id', 'quantity')
        .where({"r.recipe_id": recipe_id})
        .join('steps as st', 'st.recipe_id', 'r.recipe_id')
        .count()
        .join('ingredients as ing')
        .join('recipes_ingredients as rec_ing', 'rec_ing.recipe_id', 'r.recipe_id');

        const newObj = {
            recipe_id: recipe[0].recipe_id,
            recipe_name: recipe[0].recipe_name,
            steps:
              recipe[0].step_id !== null
                ? recipe.map((step) => {
                    return {
                      step_number: step.step_number,
                      instructions: step.instructions,
                      ingredients:
                      step.ingredients.ingredient_id !== null ?
                        step.ingredients.map(ing => {
                        return {
                            ingredient_id: ing.ingredient_id
                            
                            }
                        }) : []
                    } 
                  })
                : [],
          };
          return newObj;
    }
}