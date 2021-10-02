const NewComment = require('../NewComment');

describe('A newComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // arrange
    const payload = {};

    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      content: 1234,
    };

    expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newComment object correctly', () => {
    const payload = {
      content: 'content',
    };

    const { content } = new NewComment(payload);

    expect(content).toEqual(payload.content);
  });
});
