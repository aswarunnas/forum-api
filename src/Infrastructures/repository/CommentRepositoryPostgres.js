const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const GetComment = require('../../Domains/comments/entities/GetComment');
const { mapGetCommentsDBToModel } = require('../../utils');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment, credentialId, threadId) {
    const { content } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES($1,$2,$3,$4,$5,$6) RETURNING id, content, owner',
      values: [id, content, date, credentialId, threadId, '0'],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async verifyCommenter(commentId, userId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Comment not found');
    }

    if (result.rows[0].owner !== userId) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async deleteComment(commentId) {
    const deleteComment = '1';
    const query = {
      text: 'UPDATE comments SET is_delete = $1 WHERE id = $2 RETURNING id, is_delete',
      values: [deleteComment, commentId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('comment not found');
    }
  }

  async getComment(threadId) {
    const query = {
      text: `SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete FROM comments
      LEFT JOIN users ON users.id = comments.owner WHERE comments.thread_id = $1 
      ORDER BY comments.date ASC`,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    const comments = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < result.rowCount; i++) {
      const getComment = new GetComment({
        ...result.rows.map(mapGetCommentsDBToModel)[i],
      });
      comments.push({ ...getComment });
    }
    return comments;
  }
}

module.exports = CommentRepositoryPostgres;
