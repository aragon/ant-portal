import StoredList from './StoredList'

const MOCK_ITEM = {
  description: 'mock description 1',
}

const MOCK_ITEM2 = {
  description: 'mock description 2',
}

describe('StoredList.', () => {
  const list = new StoredList<{ description: string }>('key')
  const spyLocalStorage = jest.spyOn(Storage.prototype, 'setItem')

  it('update() updates the list and stores in localStorage', () => {
    list.update([MOCK_ITEM])
    expect(list.getItems()).toEqual([MOCK_ITEM])
    expect(spyLocalStorage).toBeCalledWith(
      'key',
      '[{"description":"mock description 1"}]'
    )
  })

  it('add() correctly adds an item to the list', () => {
    list.add(MOCK_ITEM2)

    expect(list.getItems()).toEqual([MOCK_ITEM, MOCK_ITEM2])
  })

  it('remove() removes an item from the list via index', () => {
    list.remove(1)
    expect(list.getItems()).toEqual([MOCK_ITEM])
  })
})
