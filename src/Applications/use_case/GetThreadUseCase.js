class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    const getThread = await this._threadRepository.getThread(threadId);
    const comments = await this._commentRepository.getComment(threadId);

    const detailThread = {
      ...getThread,
      comments,
    };

    return detailThread;
  }
}

module.exports = GetThreadUseCase;
