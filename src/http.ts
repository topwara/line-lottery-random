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

// Response Format : for Http
export const responseFormatHttp = <T>(status: EResponseStatus, data: T & any): ResponseFormat<any> => {
  const bodyResponse = JSON.stringify(
    {
      res_code: ResponseTypeCode[status],
      res_desc: status !== EResponseStatus.SUCCESS ? data.error : status,
      ...data,
    },
    null,
    2,
  )

  const initResponse = {
    status: ResponseStatusCode[status],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ['GET', 'POST'],
      'Access-Control-Allow-Headers': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    },
  }

  return new Response(bodyResponse, initResponse)
}
