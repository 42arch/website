import { Shuo } from '@prisma/client'

export type ShuoDto = Pick<Shuo, 'content'>

export type ShuoResponse = {
  data: Shuo[]
  nextPage: number
}
