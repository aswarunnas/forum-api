const AddedThread = require('../AddedThread');

describe('A AddedThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // arrange
    const payload = {
      title: 'title',
      owner: 'owner',
    };

    // action
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // arrange
    const payload = {
      id: 'id',
      title: 1234,
      owner: 'owner',
    };

    // action and assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedThread object correctly', () => {
    // arrange
    const payload = {
      id: 'id',
      title: 'title',
      owner: 'owner',
    };

    // action
    const { id, title, owner } = new AddedThread(payload);

    // assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
