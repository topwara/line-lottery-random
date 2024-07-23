// @bun
// src/http.ts
var ResponseTypeCode = {
  ["success" /* SUCCESS */]: "00",
  ["warning" /* WARNING */]: "98",
  ["error" /* ERROR */]: "99"
};
var ResponseStatusCode = {
  ["success" /* SUCCESS */]: 200,
  ["warning" /* WARNING */]: 400,
  ["error" /* ERROR */]: 500
};
var responseFormatHttp = (status, data) => {
  const bodyResponse = JSON.stringify({
    res_code: ResponseTypeCode[status],
    res_desc: status !== "success" /* SUCCESS */ ? data.error : status,
    ...data
  }, null, 2);
  const initResponse = {
    status: ResponseStatusCode[status],
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": ["GET", "POST"],
      "Access-Control-Allow-Headers": ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
    }
  };
  return new Response(bodyResponse, initResponse);
};

// src/api/line.ts
var lineHandler = async (req) => {
  try {
    console.log("\uD83D\uDFE1 req => ", req);
    const randomNumbers = generateLotteryNumbers();
    const lineMessage = generateLineMessage(randomNumbers);
    const sendBoardCast = await fetch("https://api.line.me/v2/bot/message/broadcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env["LINETOKEN"]}`
      },
      body: lineMessage
    });
    if (sendBoardCast.status !== 200)
      return responseFormatHttp("warning" /* WARNING */, { msg: "Warning /message/broadcast" });
    return responseFormatHttp("success" /* SUCCESS */, { msg: "Success" });
  } catch (error) {
    return responseFormatHttp("error" /* ERROR */, { msg: "Error" });
  }
};
var line_default = lineHandler;
var getRandomNumber = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, "0");
};
var generateLotteryNumbers = () => {
  const result = {
    sixDigit: getRandomNumber(6),
    threeDigit: [],
    twoDigit: getRandomNumber(2)
  };
  for (let i = 0;i < 4; i++)
    result.threeDigit.push(getRandomNumber(3));
  return result;
};
var generateLineMessage = (randomNumbersObj) => {
  const { sixDigit, threeDigit, twoDigit } = randomNumbersObj;
  const message = {
    messages: [
      {
        type: "flex",
        altText: "Lottery Random \u0E2A\u0E38\u0E48\u0E21\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E41\u0E23\u0E07\u0E1A\u0E31\u0E25\u0E14\u0E32\u0E25\u0E43\u0E08",
        contents: {
          type: "bubble",
          size: "mega",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "\u0E23\u0E32\u0E07\u0E27\u0E31\u0E25\u0E17\u0E35\u0E48 1",
                weight: "bold",
                size: "xl",
                align: "center",
                color: "#0D47A1"
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: `${sixDigit}`,
                    size: "3xl",
                    weight: "bold",
                    align: "center"
                  }
                ],
                margin: "md",
                paddingAll: "10px",
                backgroundColor: "#FFF9C4",
                cornerRadius: "5px"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "\u0E40\u0E25\u0E02\u0E2B\u0E19\u0E49\u0E32 3 \u0E15\u0E31\u0E27",
                        weight: "bold",
                        align: "center",
                        color: "#0D47A1"
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: `${threeDigit[0]}`,
                            weight: "bold",
                            size: "xl",
                            align: "center"
                          },
                          {
                            type: "text",
                            text: `${threeDigit[1]}`,
                            weight: "bold",
                            size: "xl",
                            align: "center"
                          }
                        ],
                        margin: "md",
                        paddingAll: "10px",
                        backgroundColor: "#FFF9C4",
                        cornerRadius: "5px"
                      }
                    ],
                    flex: 1
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "\u0E40\u0E25\u0E02\u0E17\u0E49\u0E32\u0E22 3 \u0E15\u0E31\u0E27",
                        weight: "bold",
                        align: "center",
                        color: "#0D47A1"
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        contents: [
                          {
                            type: "text",
                            text: `${threeDigit[2]}`,
                            weight: "bold",
                            size: "xl",
                            align: "center"
                          },
                          {
                            type: "text",
                            text: `${threeDigit[3]}`,
                            weight: "bold",
                            size: "xl",
                            align: "center"
                          }
                        ],
                        margin: "md",
                        paddingAll: "10px",
                        backgroundColor: "#FFF9C4",
                        cornerRadius: "5px"
                      }
                    ],
                    flex: 1
                  }
                ],
                margin: "md",
                spacing: "10px",
                paddingTop: "10px"
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "\u0E40\u0E25\u0E02\u0E17\u0E49\u0E32\u0E22 2 \u0E15\u0E31\u0E27",
                    color: "#0D47A1",
                    weight: "bold",
                    align: "center"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: `${twoDigit}`,
                        weight: "bold",
                        size: "xl",
                        align: "center"
                      }
                    ],
                    backgroundColor: "#FFF9C4",
                    margin: "md",
                    paddingAll: "10px",
                    cornerRadius: "5px"
                  }
                ],
                margin: "md",
                paddingAll: "10px",
                cornerRadius: "5px"
              },
              {
                type: "separator"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [],
                margin: "md",
                width: "90%",
                justifyContent: "center",
                offsetStart: "10px",
                spacing: "10px"
              },
              {
                type: "text",
                text: "\u0E02\u0E2D\u0E43\u0E2B\u0E49\u0E23\u0E48\u0E33 \u0E02\u0E2D\u0E43\u0E2B\u0E49\u0E23\u0E27\u0E22",
                align: "center",
                weight: "regular",
                offsetTop: "5px"
              }
            ]
          },
          styles: {
            footer: {
              separator: true
            }
          }
        }
      }
    ]
  };
  return JSON.stringify(message, null, 2);
};

// src/index.ts
var server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (pathname === "/")
      return await line_default(req);
    return responseFormatHttp("success" /* SUCCESS */, {});
  }
});
console.log(`Listening on http://localhost:${server.port} ...`);
