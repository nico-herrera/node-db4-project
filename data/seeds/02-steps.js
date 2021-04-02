
exports.seed = function(knex) {
      return knex('steps').insert([
     {step_id: 11,
      step_number: 1,
      step_instructions: "Put a large saucepan on a medium heat",
      recipe_id: 1}
      ]);
};
