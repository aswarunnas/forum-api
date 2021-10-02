const GetThreadUseCase = require('../GetThreadUseCase');
const GetThread = require('../../../Domains/threads/entities/GetThread');
const GetComment = require('../../../Domains/comments/entities/GetComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');

describe('GetThreadUseCase', () => {
  it('should orcestrating get thread correctly', async () => {
    const getThread = new GetThread({
      id: 'thread-123',
      title: 'title',
      body: 'body',
      date: 'date',
      username: 'username',
    });

    const getComment = new GetComment({
      id: 'comment-123',
      username: 'username',
      date: 'date',
      content: 'content',
      is_delete: '0',
    });

    const comments = [
      {
        ...getComment,
      },
    ];

    const expectedDetailThread = {
      ...getThread,
      comments,
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.getThread = jest.fn().mockImplementation(() => Promise.resolve(getThread));
    // eslint-disable-next-line max-len
    mockCommentRepository.getComment = jest.fn().mockImplementation(() => Promise.resolve(comments));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const detailThread = await getThreadUseCase.execute('thread-123');

    expect(detailThread).toEqual(expectedDetailThread);
    expect(mockThreadRepository.getThread).toBeCalledWith('thread-123');
    expect(mockCommentRepository.getComment).toBeCalledWith('thread-123');
  });
});
