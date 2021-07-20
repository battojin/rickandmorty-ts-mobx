import { types, flow } from "mobx-state-tree"

export const Character = types
  .model("Character", {
    id: types.number,
    created: types.string,
    episode: types.array(types.string),
    gender: types.string,
    image: types.string,
    location: types.model({name: types.string, url: types.string}),
    name: types.string,
    origin: types.model({name: types.string, url: types.string}),
    species: types.string,
    status: types.string,
    type: types.optional(types.string, ""),
    url: types.string,
  })

export const CharacterStore = types
  .model("CharacterStore", {
    characters: types.array(Character),
    currentPage: types.optional(types.number, 0)
  })
  .actions(self => ({
    loadCharacters: flow(function* loadCharacters() {
        try {
            const res = yield fetch(`https://rickandmortyapi.com/api/character/?page=${self.currentPage+1}`)
            .then(response => response.json())
            .then(data => data.results)
            self.characters.push(...res)
            self.currentPage += 1
        } catch (error) {
            console.error('Failed to fetch', error)
        }
    })
  }))
  .views(self => ({
      filter(status: string, gender: string, charName: string) {
          if (!status && !gender && !charName) {
              return self.characters
          } else if (!status && !charName) {
              return self.characters.filter((char) => char.gender === gender)  
          } else if (!gender && !charName) {
            return self.characters.filter((char) => char.status === status)
          } else if (!status && !gender) {
              return self.characters.filter((char) => char.name.toLowerCase().includes(charName.toLowerCase()))
          } else if (!status) {
            return self.characters.filter((char) => char.gender === gender && char.name.toLowerCase().includes(charName.toLowerCase()))
          } else if (!gender) {
            return self.characters.filter((char) => char.status === status && char.name.toLowerCase().includes(charName.toLowerCase()))
          } else if (!charName) {
            return self.characters.filter((char) => char.status === status && char.gender === gender)
          } else {
            return self.characters.filter((char) => char.status === status && char.gender === gender && char.name.toLowerCase().includes(charName.toLowerCase()))
          }
      }
  }))
