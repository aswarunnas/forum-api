/* eslint-disable camelcase */
/* istanbul ignore file */

const mapGetCommentsDBToModel = ({ is_delete, ...args }) => ({
  ...args,
  isDelete: is_delete,
});

module.exports = {
  mapGetCommentsDBToModel,
};
