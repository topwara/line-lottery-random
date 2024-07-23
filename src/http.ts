import express, { Request, Response } from 'express'

export const ACCESS_CONTROL_ALLOW_HEADERS = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
}

export type ResponseFormat<T> = {
  res_code: string
  res_desc: string
} & T

export enum EResponseStatus {
  'SUCCESS' = 'success',
  'WARNING' = 'warning',
  'ERROR' = 'error',
}

export const ResponseTypeCode = {
  [EResponseStatus.SUCCESS]: '00',
  [EResponseStatus.WARNING]: '98',
  [EResponseStatus.ERROR]: '99',
}

export const ResponseStatusCode = {
  [EResponseStatus.SUCCESS]: 200,
  [EResponseStatus.WARNING]: 400,
  [EResponseStatus.ERROR]: 500,
}

export const responseFormatHttp = <T>(
  req: Request | any,
  res: Response,
  status: EResponseStatus,
  data: T & any,
): ResponseFormat<any> => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(204)
    res.send({
      res_code: '99',
      res_desc: 'Intenal Server Error',
    })
    return res
  }

  res.status(ResponseStatusCode[status])
  res.send({
    res_code: ResponseTypeCode[status],
    res_desc: status !== EResponseStatus.SUCCESS ? data.error : status,
    ...data,
  })

  return res
}
