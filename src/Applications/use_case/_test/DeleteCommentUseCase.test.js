const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orcestrating delete comment action correctly', async () => {
    // arrange
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockCommentRepository.verifyCommenter = jest.fn().mockImplementation(() => Promise.resolve());
    // eslint-disable-next-line max-len
    mockThreadRepository.verifyAvailableThread = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    await deleteCommentUseCase.execute('user-123', 'thread-123', 'comment-123');

    expect(mockCommentRepository.verifyCommenter).toBeCalledWith('comment-123', 'user-123');
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith('thread-123');
    expect(mockCommentRepository.deleteComment).toBeCalledWith('comment-123');
  });
});
