import { Shuoshuo } from '@prisma/client'

export type ShuoDto = Pick<Shuoshuo, 'content'>

export type ShuoResponse = {
  data: Shuoshuo[]
  nextPage: number
}
