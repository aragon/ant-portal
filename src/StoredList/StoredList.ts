class StoredList<T> {
  name
  items

  // name: the key used by StoredList to save the list in localStorage.
  constructor(name: string) {
    this.name = name
    this.items = this.loadItems()
  }

  private loadItems(): T[] {
    let items = null
    const value = localStorage.getItem(this.name)

    if (value === null) {
      return []
    }

    try {
      items = JSON.parse(value)
    } catch (err) {
      console.error(
        `StoredList (${this.name}) couldn’t parse the loaded items`,
        err
      )
    }

    if (!Array.isArray(items)) {
      items = null
      console.error(
        `The data loaded by StoredList (${this.name}) is not an array`,
        items
      )
    }

    return items === null ? [] : items
  }

  private saveItems(): void {
    localStorage.setItem(this.name, JSON.stringify(this.items))
  }

  getItems(): T[] {
    return this.items
  }

  update(items: T[] = []): T[] {
    this.items = items
    this.saveItems()
    return items
  }

  add(value: T): T[] {
    return this.update([...this.items, value])
  }

  remove(index: number): T[] {
    return this.update([
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1),
    ])
  }
}

export default StoredList
