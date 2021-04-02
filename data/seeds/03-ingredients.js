
exports.seed = function(knex) {
      return knex('ingredients').insert([
        { ingredient_id: 27, ingredient_name: "olive oil" }
      ]);
};
