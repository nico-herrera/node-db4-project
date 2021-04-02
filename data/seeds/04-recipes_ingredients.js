
exports.seed = function(knex) {
      return knex('recipes_ingredients').insert([
      {recipe_id: 1, ingredient_id: 27,  quantity: 0.014}
      ]);
};
