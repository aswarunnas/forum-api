const GetThread = require('../GetThread');

describe('A getThread entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // arrange
    const payload = {
      id: 'id',
      title: 'title',
    };

    // action
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    // arrange
    const payload = {
      id: 'id',
      title: 1234,
      body: 'body',
      date: 'date',
      username: 'dicoding',
    };

    // action and assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedThread object correctly', () => {
    // arrange
    const payload = {
      id: 'id',
      title: 'title',
      body: 'body',
      date: 'date',
      username: 'dicoding',
    };

    // action
    const {
      id, title, body, date, username,
    } = new GetThread(payload);

    // assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });
});
