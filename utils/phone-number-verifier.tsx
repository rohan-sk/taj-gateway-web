import React from "react"

const phoneNumberVerifier = (countryCode: any, phoneNumber: number) => {
  // Define regex patterns for different country codes
  const patterns: any = {
    USA: /^\d{10}$/, // 10 digits for US
    UK: /^\d{10,11}$/, // 10 or 11 digits for UK
    AF: /^\d{10}$/,
    AL: /^\d{9}$/,
    DZ: /^\d{10}$/,
    AD: /^\d{6,9}$/,
    AO: /^\d{9}$/,
    AI: /^\d{10}$/,
    AQ: /^\d{8,12}$/,
    AR: /^\d{10}$/,
    AM: /^\d{8}$/,
    AW: /^\d{7}$/,
    AU: /^\d{8,10}$/,
    AT: /^\d{10}$/,
    AZ: /^\d{9}$/,
    BS: /^\d{7}$/,
    BH: /^\d{8}$/,
    BD: /^\d{11}$/,
    BB: /^\d{7}$/,
    BY: /^\d{9}$/,
    BE: /^\d{9}$/,
    BZ: /^\d{7}$/,
    BJ: /^\d{8}$/,
    BM: /^\d{7}$/,
    BT: /^\d{8}$/,
    BW: /^\d{8}$/,
    BR: /^\d{10}$/,
    IO: /^\d{7,12}$/,
    BG: /^\d{9}$/,
    BF: /^\d{8}$/,
    BI: /^\d{8}$/,
    KH: /^\d{8,9}$/,
    CM: /^\d{8}$/,
    CA: /^\d{10}$/,
    CV: /^\d{7}$/,
    KY: /^\d{7}$/,
    CF: /^\d{7}$/,
    TD: /^\d{8}$/,
    CL: /^\d{8}$/,
    CN: /^\d{11}$/,
    CX: /^\d{8,12}$/,
    CC: /^\d{8,12}$/,
    CO: /^\d{10}$/,
    KM: /^\d{8}$/,
    CG: /^\d{8,14}$/,
    CK: /^\d{5,7}$/,
    CR: /^\d{8}$/,
    HR: /^\d{9}$/,
    CU: /^\d{8}$/,
    CY: /^\d{8}$/,
    DK: /^\d{8}$/,
    DJ: /^\d{8}$/,
    DM: /^\d{7}$/,
    DO: /^\d{10}$/,
    EC: /^\d{9}$/,
    EG: /^\d{10}$/,
    SV: /^\d{8}$/,
    GQ: /^\d{9}$/,
    ER: /^\d{7}$/,
    EE: /^\d{7,8}$/,
    ET: /^\d{9}$/,
    FO: /^\d{6,8}$/,
    FJ: /^\d{7}$/,
    FI: /^\d{9}$/,
    FR: /^\d{10}$/,
    GF: /^\d{10}$/,
    PF: /^\d{6}$/,
    GA: /^\d{9}$/,
    GM: /^\d{7}$/,
    GE: /^\d{9}$/,
    DE: /^\d{10}$/,
    GH: /^\d{9}$/,
    GI: /^\d{8}$/,
    GR: /^\d{10}$/,
    GL: /^\d{6,8}$/,
    GD: /^\d{7}$/,
    GP: /^\d{10}$/,
    GU: /^\d{10}$/,
    GT: /^\d{10}$/,
    GG: /^\d{8}$/,
    GN: /^\d{6,8}$/,
    GW: /^\d{9}$/,
    GY: /^\d{7}$/,
    HT: /^\d{8}$/,
    HN: /^\d{8}$/,
    HK: /^\d{8}$/,
    HU: /^\d{8,9}$/,
    IS: /^\d{7}$/,
    IN: /^\d{10}$/,
    ID: /^\d{9,12}$/,
    IR: /^\d{10}$/,
    IQ: /^\d{11}$/,
    IE: /^\d{7,9}$/,
    IM: /^\d{6,8}$/,
    IL: /^\d{9}$/,
    IT: /^\d{10}$/,
    JM: /^\d{10}$/,
    JP: /^\d{10,11}$/,
    JE: /^\d{6,10}$/,
    JO: /^\d{9}$/,
    KZ: /^\d{10}$/,
    KE: /^\d{9,10}$/,
    KI: /^\d{6}$/,
    KP: /^\d{10}$/,
    KR: /^\d{10,11}$/,
    KW: /^\d{8}$/,
    KG: /^\d{9}$/,
    LA: /^\d{8}$/,
    LV: /^\d{8}$/,
    LB: /^\d{8}$/,
    LS: /^\d{8}$/,
    LR: /^\d{7}$/,
    LI: /^\d{7,9}$/,
    LT: /^\d{8}$/,
    LU: /^\d{8}$/,
    MO: /^\d{8}$/,
    MK: /^\d{8}$/,
    MG: /^\d{7,8}$/,
    MW: /^\d{8}$/,
    MY: /^\d{9,10}$/,
    MV: /^\d{7}$/,
    ML: /^\d{8}$/,
    MT: /^\d{8}$/,
    MH: /^\d{7}$/,
    MQ: /^\d{10}$/,
    MR: /^\d{8}$/,
    MU: /^\d{7}$/,
    YT: /^\d{9}$/,
    MX: /^\d{10}$/,
    FM: /^\d{7}$/,
    MD: /^\d{8}$/,
    MC: /^\d{8}$/,
    MN: /^\d{8}$/,
    ME: /^\d{8}$/,
    MS: /^\d{7}$/,
    MA: /^\d{10}$/,
    MZ: /^\d{9}$/,
    MM: /^\d{8,9}$/,
    NA: /^\d{8}$/,
    NR: /^\d{7}$/,
    NP: /^\d{10}$/,
    NL: /^\d{10}$/,
    NC: /^\d{6}$/,
    NZ: /^\d{10}$/,
    NI: /^\d{8}$/,
    NE: /^\d{8}$/,
    NG: /^\d{10}$/,
    NU: /^\d{4}$/,
    NF: /^\d{7,12}$/,
    MP: /^\d{7}$/,
    NO: /^\d{8}$/,
    OM: /^\d{8}$/,
    PK: /^\d{10}$/,
    PW: /^\d{7}$/,
    PS: /^\d{8}$/,
    PA: /^\d{8}$/,
    PG: /^\d{8}$/,
    PY: /^\d{8}$/,
    PE: /^\d{9}$/,
    PH: /^\d{7,11}$/,
    PN: /^\d{4}$/,
    PL: /^\d{9}$/,
    PT: /^\d{9}$/,
    PR: /^\d{10}$/,
    QA: /^\d{8}$/,
    RO: /^\d{10}$/,
    RU: /^\d{10}$/,
    RW: /^\d{9}$/,
    WS: /^\d{7}$/,
    SM: /^\d{10}$/,
    SA: /^\d{9}$/,
    SN: /^\d{9}$/,
    RS: /^\d{8,9}$/,
    SC: /^\d{7}$/,
    SL: /^\d{8}$/,
    SG: /^\d{8}$/,
    SK: /^\d{9}$/,
    SI: /^\d{8}$/,
    SB: /^\d{7}$/,
    SO: /^\d{7,8}$/,
    ZA: /^\d{9}$/,
    SS: /^\d{10}$/,
    GS: /^\d{7,12}$/,
    ES: /^\d{8}$/,
    LK: /^\d{9}$/,
    SD: /^\d{9}$/,
    SR: /^\d{7}$/,
    SJ: /^\d{7,12}$/,
    SE: /^\d{7,9}$/,
    CH: /^\d{9}$/,
    TW: /^\d{9}$/,
    TJ: /^\d{9}$/,
    TZ: /^\d{10}$/,
    TH: /^\d{9}$/,
    TL: /^\d{8}$/,
    TG: /^\d{8}$/,
    TK: /^\d{7,12}$/,
    TO: /^\d{5,6}$/,
    TT: /^\d{7}$/,
    TN: /^\d{8}$/,
    TR: /^\d{10}$/,
    TM: /^\d{8}$/,
    TC: /^\d{7}$/,
    TV: /^\d{5}$/,
    UG: /^\d{9}$/,
    UA: /^\d{10}$/,
    AE: /^\d{9}$/,
    GB: /^\d{10}$/,
    US: /^\d{10}$/,
    UY: /^\d{8}$/,
    UZ: /^\d{9}$/,
    VU: /^\d{7}$/,
    VE: /^\d{10}$/,
    VN: /^\d{10}$/,
    VG: /^\d{10}$/,
    VI: /^\d{10}$/,
    WF: /^\d{6,12}$/,
    YE: /^\d{7,9}$/,
    ZM: /^\d{9}$/,
    ZW: /^\d{9}$/,
    // Add more patterns for other countries as needed
  }

  // Check if the country code is valid
  if (!(countryCode in patterns)) {
    return false // Country code not recognized
  }

  // Check if the phone number matches the pattern for the given country code
  const pattern = patterns[countryCode]

  return pattern.test(phoneNumber)
}

export default phoneNumberVerifier