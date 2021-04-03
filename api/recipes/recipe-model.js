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

      console.log('1')
      // return db('recipes as r').where({"r.recipe_id": recipe_id}).first();
       const recipe = await db.select('r.recipe_name', 'st.step_instructions', 'st.step_number', 'st_ing.quantity',  'ing.ingredient_id')
       .from('recipes as r')
        .where({"r.recipe_id": recipe_id})
        .join('steps as st', 'st.recipe_id', 'r.recipe_id')
        .groupBy('st.step_number')
        .orderBy('st.step_number')
        .groupBy('st.step_instructions')
        .leftJoin('steps_ingredients as st_ing', 'st_ing.step_id', 'st.step_id')
        .leftJoin('ingredients as ing', 'ing.ingredient_id', 'st_ing.ingredient_id')
        .groupBy('ing.ingredient_id')
       
       

        console.log(recipe, "recipe")

        

        // return recipe;

        const newObj = {
            recipe_name: recipe[0].recipe_name,
            steps:
                recipe.map((step) => {
                    return {
                      step_number: step.step_number,
                      step_instructions: step.step_instructions
                    }
                  })
          };
          return newObj; 
    },

    find: () => {
      return db('recipes')
    }


}

                //  recipe.map((step) => {
                //     return {
                //       step_number: step.step_number,
                //       step_instructions: step.step_instructions,
                //       ingredients: []
                //      }
                //    })

                // step.ingredients[0].ingredient_id !== null ?
                // step.ingredients.map(ing => {
                //   return {
                //     ingredient_id: ing.ingredient_id,
                //     quantity: st_ing.quantity
                //   }
                // }) : [],