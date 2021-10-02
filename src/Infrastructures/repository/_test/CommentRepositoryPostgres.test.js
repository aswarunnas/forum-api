const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const pool = require('../../database/postgres/pool');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const GetComment = require('../../../Domains/comments/entities/GetComment');

describe('CommentRepository postgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist comment', async () => {
      const newComment = new NewComment({
        content: 'content',
      });

      const credentialId = 'user-123';
      const threadId = 'thread-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await commentRepositoryPostgres.addComment(newComment, credentialId, threadId);

      const comment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });

    it('should return addedComment correctly', async () => {
      const newComment = new NewComment({
        content: 'content',
      });

      const credentialId = 'user-123';
      const threadId = 'thread-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // eslint-disable-next-line max-len
      const addedComment = await commentRepositoryPostgres.addComment(newComment, credentialId, threadId);

      expect(addedComment).toBeInstanceOf(AddedComment);
    });
  });

  describe('verifyCommenter function', () => {
    it('should not throw authorization error when commenter is true', async () => {
      const credentialId = 'user-123';
      const commentId = 'comment-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // eslint-disable-next-line max-len
      await expect(commentRepositoryPostgres.verifyCommenter(commentId, credentialId)).resolves.not.toThrowError(AuthorizationError);
    });

    it('should throw authorization error when commenter is false', async () => {
      const credentialId = 'user-123';
      const commentId = 'comment-124';

      await UsersTableTestHelper.addUser({ id: 'user-124' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-124', owner: 'user-124' });
      await CommentsTableTestHelper.addComment({ id: 'comment-124', owner: 'user-124', threadId: 'thread-124' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // eslint-disable-next-line max-len
      await expect(commentRepositoryPostgres.verifyCommenter(commentId, credentialId)).rejects.toThrowError(AuthorizationError);
    });
  });

  describe('deleteComment function', () => {
    it('should not throw NotFoundError when delete action correctly', async () => {
      const commentId = 'comment-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // eslint-disable-next-line max-len
      await expect(commentRepositoryPostgres.deleteComment(commentId)).resolves.not.toThrowError(NotFoundError);
    });

    it('should throw NotFoundError when delete action not correctly', async () => {
      const commentId = 'comment-123';

      await UsersTableTestHelper.addUser({ id: 'user-124' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-124', owner: 'user-124' });
      await CommentsTableTestHelper.addComment({ id: 'comment-124', owner: 'user-124', threadId: 'thread-124' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // eslint-disable-next-line max-len
      await expect(commentRepositoryPostgres.deleteComment(commentId)).rejects.toThrowError(NotFoundError);
    });
  });

  describe('getComment function', () => {
    it('should return array of getComment correctly', async () => {
      const expectedComment = {
        id: 'comment-123',
        username: 'dicoding',
        date: 'date',
        content: 'content',
      };

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', isDelete: '0' });
      await CommentsTableTestHelper.addComment({ id: 'comment-124', isDelete: '0' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      const comments = await commentRepositoryPostgres.getComment('thread-123');
      expect(comments[0]).toEqual(expectedComment);
    });
  });
});
