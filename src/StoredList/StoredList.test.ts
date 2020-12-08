import StoredList from './StoredList'

const MOCK_ITEM = {
  description: 'mock description 1',
}

const MOCK_ITEM2 = {
  description: 'mock description 2',
}

function createStoredList(key: string) {
  return new StoredList<{ description: string }>(key)
}

describe('StoredList.', () => {
  it('update() replaces the list and stores in localStorage', () => {
    const list = createStoredList('update-test')
    const spyLocalStorage = jest.spyOn(Storage.prototype, 'setItem')

    list.update([MOCK_ITEM2])
    list.update([MOCK_ITEM, MOCK_ITEM2])

    expect(list.getItems()).toEqual([MOCK_ITEM, MOCK_ITEM2])
    expect(spyLocalStorage).toBeCalledWith(
      'update-test',
      '[{"description":"mock description 1"},{"description":"mock description 2"}]'
    )
  })

  it('add() correctly adds an item to the list', () => {
    const list = createStoredList('add-test')

    list.add(MOCK_ITEM)
    list.add(MOCK_ITEM2)

    expect(list.getItems()).toEqual([MOCK_ITEM, MOCK_ITEM2])
  })

  it('remove() removes an item from the list via index', () => {
    const list = createStoredList('remove-test')

    list.update([MOCK_ITEM, MOCK_ITEM2])
    list.remove(1)
    expect(list.getItems()).toEqual([MOCK_ITEM])
  })
})
