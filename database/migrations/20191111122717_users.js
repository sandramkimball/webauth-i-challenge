
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 122)
        .notNullable()
        .unique();
      tbl.string('password', 122).notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  
};
