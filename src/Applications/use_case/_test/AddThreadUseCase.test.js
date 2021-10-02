const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');

describe('AddThreadUseCase', () => {
    it('should orcestrating add thread correctly', async () => {
        //arrange
        const useCasePayload = {
            title: 'title',
            body: 'body',
        };

        const expectedAddedThread = new AddedThread({
            id: 'thread-123',
            title: 'title',
            owner: 'user-123'
        });
        
        const mockThreadRepository = new ThreadRepository();
        mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(expectedAddedThread));

        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        const addedThread = await addThreadUseCase.execute(useCasePayload, 'user-123');

        //assert
        expect(addedThread).toStrictEqual(expectedAddedThread);
        expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread({
            title: useCasePayload.title,
            body: useCasePayload.body,
        }), 'user-123');
    });
});