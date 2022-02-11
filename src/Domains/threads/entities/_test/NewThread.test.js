const NewThread = require('../NewThread');

describe('A NewThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // arrange
    const payload = {
      title: 'title',
    };

    // action and assert
    expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      title: 1234,
      body: 'body',
    };

    expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newthread entities correctly', () => {
    const payload = {
      title: 'title',
      body: 'body',
    };

    const { title, body } = new NewThread(payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});
