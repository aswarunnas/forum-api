const GetComment = require('../GetComment');

describe('A getComment entities', () => {
  it('should throw error when payload not contain needed property', () => {
        //arrange
        const payload = {
            id: 'id',
            username: 'username',
        };

        //action
        expect(() => new GetComment(payload)).toThrowError('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        //arrange
        const payload = {
            id: 'id',
            username: 'username',
            date: 'date',
            content: 1234,
            is_delete: '0',
        };

        //action and assert
        expect(() => new GetComment(payload)).toThrowError('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create getComment object correctly', () => {
        //arrange
        const payload = {
          id: 'id',
          username: 'username',
          date: 'date',
          content: 'content',
          is_delete: '0',
        };

        //action
        const {
          id, username, date, content,
        } = new GetComment(payload);

        //assert
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(date).toEqual(payload.date);
        expect(username).toEqual(payload.username);
    });

    it('should show status deleted comment when comment was deleted', () => {
      //arrange
      const payload = {
        id: 'id',
        username: 'username',
        date: 'date',
        content: 'content',
        is_delete: '1',
      };

      //action
      const {
        id, username, date, content,
      } = new GetComment(payload);

      //assert
      expect(id).toEqual(payload.id);
      expect(content).toEqual('**komentar telah dihapus**');
      expect(date).toEqual(payload.date);
      expect(username).toEqual(payload.username);
    });
});
