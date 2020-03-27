import createUID from '../../src/utils/createUID'

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = createUID()
    expect(id).toHaveLength(8)
  })
})
