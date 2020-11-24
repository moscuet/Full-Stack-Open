// jest, no supertest
const dummy = require('../utils/list_helper').dummy
// eslint-disable-next-line no-undef
describe('dummy test', () => {
  // eslint-disable-next-line no-undef
  test('dummy returns one', () => {
    const blogs = []

    const result = dummy(blogs)
    // eslint-disable-next-line no-undef
    expect(result).toBe(1)
  })
})