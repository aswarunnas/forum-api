/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumn('comments', {
    is_delete: {
      type: 'VARCHAR(2)',
    },
  });

  pgm.sql("UPDATE comments SET is_delete = '0' WHERE is_delete = NULL");
};

exports.down = pgm => {
  pgm.dropColumn('comments', 'is_delete');
};
