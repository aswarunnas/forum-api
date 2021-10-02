const AddCommentUseCase = require('../AddCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  it('should orcestrating add comment action correctly', async () => {
    const useCasePayload = {
      content: 'content',
    };

    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: 'content',
      owner: 'user-123',
    });

    const newComment = new NewComment({
      content: 'content',
    });

    const credentialId = 'user-123';
    const threadId = 'thread-123';

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    // eslint-disable-next-line max-len
    mockThreadRepository.verifyAvailableThread = jest.fn().mockImplementation(() => Promise.resolve());
    // eslint-disable-next-line max-len
    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(expectedAddedComment));

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedComment = await addCommentUseCase.execute(useCasePayload, credentialId, threadId);
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(threadId);
    expect(mockCommentRepository.addComment).toBeCalledWith(newComment, credentialId, threadId);
  });
});
