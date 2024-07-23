// Lib
import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

// Include
import { EResponseStatus, responseFormatHttp } from '../http'

// ==========

const lineHandler = async (req: Request, res: Response): Promise<any> => {
  return 'HELP ME PLEAS lineHandler'

  // try {
  //   const lineEvents = req?.body?.events as Record<string, any>[]

  //   if (lineEvents.length > 0) {
  //     //
  //     for await (const { type, message, replyToken } of lineEvents) {
  //       const texts = ['Random', 'random', 'หวย', 'สุ่ม']

  //       const isMatchText = texts.indexOf(message['text']) > -1

  //       const isReplyPrivate = type === 'message' && message['type'] === 'text' && isMatchText

  //       if (isReplyPrivate) {
  //         const randomNumbers = generateLotteryNumbers()

  //         const lineMessage = generateLineMessage(randomNumbers)

  //         const sendLine = await sendLineMessage('reply', lineMessage, replyToken)

  //         if (typeof sendLine === 'string') continue
  //       }
  //     }
  //   }

  //   return responseFormatHttp(req, res, EResponseStatus.SUCCESS, { msg: 'Success' })
  // } catch (error) {
  //   return responseFormatHttp(req, res, EResponseStatus.ERROR, { msg: 'Error', val: error })
  // }
}

export default lineHandler

// ==========================================

type TLotteryNumbers = {
  sixDigit: string
  threeDigit: string[]
  twoDigit: string
}

const sendLineMessage = async (
  lineSendType: 'broadcast' | 'reply' | null,
  lineMessageObj: Record<string, any>,
  lineReplyToken: string,
): Promise<AxiosResponse | string> => {
  //

  const lineToken = process.env['LINETOKEN']

  const lineUrl = {
    reply: 'https://api.line.me/v2/bot/message/reply',
    broadcast: 'https://api.line.me/v2/bot/message/broadcast',
  }[lineSendType]

  const lineMessage = {
    replyToken: lineSendType === 'reply' ? lineReplyToken : undefined,
    messages: lineMessageObj['messages'],
  }

  const axiosSend = await axios.post(lineUrl, lineMessage, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${lineToken}` },
  })

  if (axiosSend.status !== 200) return 'Send Line Message Failed'

  return axiosSend
}

const getRandomNumber = (length: number): string => {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0')
}

const generateLotteryNumbers = (): TLotteryNumbers => {
  const result = {
    sixDigit: getRandomNumber(6),
    threeDigit: [] as string[],
    twoDigit: getRandomNumber(2),
  }

  for (let i = 0; i < 4; i++) result.threeDigit.push(getRandomNumber(3))

  return result
}

const generateLineMessage = (randomNumbersObj: TLotteryNumbers) => {
  const { sixDigit, threeDigit, twoDigit } = randomNumbersObj

  const response = {
    messages: [
      {
        type: 'flex',
        altText: 'Lottery Random สุ่มตัวเลขเพื่อสร้างแรงบัลดาลใจ',
        contents: {
          type: 'bubble',
          size: 'mega',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'รางวัลที่ 1',
                weight: 'bold',
                size: 'xl',
                align: 'center',
                color: '#0D47A1',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: `${sixDigit}`,
                    size: '3xl',
                    weight: 'bold',
                    align: 'center',
                  },
                ],
                margin: 'md',
                paddingAll: '10px',
                backgroundColor: '#FFF9C4',
                cornerRadius: '5px',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: 'เลขหน้า 3 ตัว',
                        weight: 'bold',
                        align: 'center',
                        color: '#0D47A1',
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${threeDigit[0]}`,
                            weight: 'bold',
                            size: 'xl',
                            align: 'center',
                          },
                          {
                            type: 'text',
                            text: `${threeDigit[1]}`,
                            weight: 'bold',
                            size: 'xl',
                            align: 'center',
                          },
                        ],
                        margin: 'md',
                        paddingAll: '10px',
                        backgroundColor: '#FFF9C4',
                        cornerRadius: '5px',
                      },
                    ],
                    flex: 1,
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: 'เลขท้าย 3 ตัว',
                        weight: 'bold',
                        align: 'center',
                        color: '#0D47A1',
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                          {
                            type: 'text',
                            text: `${threeDigit[2]}`,
                            weight: 'bold',
                            size: 'xl',
                            align: 'center',
                          },
                          {
                            type: 'text',
                            text: `${threeDigit[3]}`,
                            weight: 'bold',
                            size: 'xl',
                            align: 'center',
                          },
                        ],
                        margin: 'md',
                        paddingAll: '10px',
                        backgroundColor: '#FFF9C4',
                        cornerRadius: '5px',
                      },
                    ],
                    flex: 1,
                  },
                ],
                margin: 'md',
                spacing: '10px',
                paddingTop: '10px',
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'เลขท้าย 2 ตัว',
                    color: '#0D47A1',
                    weight: 'bold',
                    align: 'center',
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: `${twoDigit}`,
                        weight: 'bold',
                        size: 'xl',
                        align: 'center',
                      },
                    ],
                    backgroundColor: '#FFF9C4',
                    margin: 'md',
                    paddingAll: '10px',
                    cornerRadius: '5px',
                  },
                ],
                margin: 'md',
                paddingAll: '10px',
                cornerRadius: '5px',
              },
              {
                type: 'separator',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [] as any,
                margin: 'md',
                width: '90%',
                justifyContent: 'center',
                offsetStart: '10px',
                spacing: '10px',
              },
              {
                type: 'text',
                text: 'ขอให้ร่ำ ขอให้รวย',
                align: 'center',
                weight: 'regular',
                offsetTop: '5px',
              },
            ],
          },
          styles: {
            footer: {
              separator: true,
            },
          },
        },
      },
    ],
  }

  return response
}
