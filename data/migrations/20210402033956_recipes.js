
exports.up = function(knex) {
  return knex.schema
  .createTable('recipes', tbl => {
      tbl.increments('recipe_id');
      tbl.text('recipe_name', 128).notNullable().unique();
      tbl.date('created_at');
  })
  .createTable('ingredients', tbl => {
    tbl.increments('ingredient_id');
    tbl.text('ingredient_name', 128).notNullable();
  })
  .createTable('steps', tbl => {
    tbl.increments('step_id');
    tbl.integer("step_number").unsigned().notNullable();
    tbl.text('step_instructions', 255).notNullable();
    tbl.integer('recipe_id').unsigned().notNullable()
    .references('recipes.recipe_id')
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
  })
  .createTable('recipes_ingredients', tbl => {
      tbl.integer('recipe_id').unsigned().notNullable()
      .references('recipes.recipe_id')
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
      tbl.integer('ingredient_id').unsigned().notNullable()
      .references('ingredients.ingredient_id')
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      tbl.float('quantity').unsigned();
  })
  
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("recipes_ingredients")
  .dropTableIfExists("steps")
  .dropTableIfExists("ingredients")
  .dropTableIfExists("recipes");
};
