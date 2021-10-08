import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: string
  name: string
}
export interface News {
  source: User
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetNewsResult = { kind: 'ok'; list: News; status: number } | GeneralApiProblem
export type Jason={kind:'ok',list:any,status:number}|GeneralApiProblem
/**
 *  source: { id: null, name: 'Barca Blaugranes' },
        author: 'Gill Clark',
        title:
          'Sergio Aguero reveals why he didn’t want Lionel Messi’s No. 10 shirt at Barcelona - Barca Blaugranes',
        description: 'The striker was also shocked by his friend’s exit',
        url:
          'https://www.barcablaugranes.com/2021/9/10/22665552/sergio-aguero-reveals-why-he-didnt-want-lionel-messis-no-10-shirt-at-barcelona',
        urlToImage:
          'https://cdn.vox-cdn.com/thumbor/bKU7JqdqYm2QIh9cVXg3nrfjBI0=/0x287:4000x2381/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22752062/1321024915.jpg',
        publishedAt: '2021-09-10T05:00:00Z',
        content:
 */