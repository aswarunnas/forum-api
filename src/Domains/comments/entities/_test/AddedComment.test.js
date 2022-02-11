const AddedComment = require('../AddedComment');

describe('A AddedComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // arrange
    const payload = {
      content: 'content',
      owner: 'owner',
    };

    // action
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // arrange
    const payload = {
      id: 'id',
      content: 1234,
      owner: 'owner',
    };

    // action and assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedComment object correctly', () => {
    // arrange
    const payload = {
      id: 'id',
      content: 'content',
      owner: 'owner',
    };

    // action
    const { id, content, owner } = new AddedComment(payload);

    // assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
