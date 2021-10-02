const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, credentialId, threadId) {
    await this._threadRepository.verifyAvailableThread(threadId);
    const newComment = new NewComment(useCasePayload);
    return this._commentRepository.addComment(newComment, credentialId, threadId);
  }
}

module.exports = AddCommentUseCase;
