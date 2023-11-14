const { when } = require('jest-when');
const mockAxios = {
    get: jest.fn(),

};

const givenAdsForDomain = (url, ads) => {
    when(mockAxios.get)
        .calledWith(url)
        .mockResolvedValue({ data: ads });
}

const reset = () => {
    mockAxios.get.mockClear();
}

module.exports = { givenAdsForDomain, mockAxios, reset }