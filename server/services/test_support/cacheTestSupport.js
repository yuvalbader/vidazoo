const { when } = require('jest-when');

const mockCache = {
    get: jest.fn(),
    set: jest.fn(),
};

const givenValueForCacheKey = (key, value) => {
    when(mockCache.get)
        .calledWith(key)
        .mockReturnValue(value)
}

const givenEmptyCache = () => {
    mockCache.get.mockReturnValue(null);
}

const givenSetSuccess = () => {
    mockCache.set.mockReturnValue();
}


const reset = () => {
    mockCache.get.mockClear();
    mockCache.set.mockClear();
}

module.exports = { givenValueForCacheKey, givenEmptyCache, givenSetSuccess, mockCache, reset }