const otpGenerator = require("otp-generator");
const { Otp, Client, User } = require("../models/models");
const { encode, decode } = require("../services/crypt");

const { v4: uuidv4 } = require("uuid");
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};
const newOTP = async (ctx) => {
  try {
    const { phone_number } = ctx.request.body;

    
    // Generate password
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 30);

    const newOtp = await Otp.create({
      id: uuidv4(),
      otp,
      expiration_time,
    });
    const details = {
      timestamp: now,
      check: phone_number,
      success: true,
      message: "OTP sent to user",
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));
    await Client.update(
      { otp_id: newOtp.id },
      { where: { contact_number: phone_number } }
    );
    return ctx.ok(200, { Status: "Success", Details: encoded });
  } catch (error) {
    console.log(error);
    ctx.err(400, error);
  }
};

const verifyOTP = async (ctx, next) => {
  const { verification_key, otp, check } = ctx.request.body;

  let currentdate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (error) {
    ctx.err(400, error);
  }

  let obj = JSON.parse(decoded);
  const check_obj = obj.check;
  if (check_obj != check) {
    const response = {
      status: "Failure",
      Details: "OTP was not to this particular phone number",
    };
    return ctx.err(400, {}, response);
  }

  let params = {
    id: obj.otp_id,
  };

  const otpResult = await Otp.findByPk(params.id);
  const result = otpResult;
  if (result != null) {
    // Check if OTP is already used or not
    if (result.verified != true) {
      // Check if OTP is expired or not
      if (dates.compare(result.expiration_time, currentdate) == 1) {
        // Check if OTP is equal to the OTP in the DB
        if (otp == result.otp) {
          let params_verified = {
            id: result.id,
            verified: true,
          };
          await Otp.update(
            {
              verified: params_verified.verified,
            },
            {
              where: {
                id: params_verified.id,
              },
            }
          );
          await Client.update(
            {
              Status: params_verified.verified,
            },
            {
              where: {
                otp_id: params_verified.id,
              },
            }
          );

          const clientResult = await Client.findOne({
            where: { contact_number: check },
          });
          if (!clientResult) {
            const response = {
              Status: "Succes",
              Details: "new",
              Check: check,
            };

            const client = await Client.create({});
            console.log(client.dataValues.id);
            ctx.phone_number = check;
            ctx.id = client.dataValues.id;
            return next();
            // return ctx.ok(200, response);
          } else {
            const response = {
              Status: "Succes",
              Details: "old",
              Check: check,
              ClientName: clientResult.client_name,
            };
            ctx.phone_number = check;
            ctx.id = clientResult.id;

            return next();
            // return ctx.ok(200, response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP NOT Matched" };
          return ctx.err(400, {}, response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Expired" };
        return ctx.err(400, {}, response);
      }
    } else {
      const response = { Status: "Failure", Details: "OTP Already Used" };
      return ctx.err(400, {}, response);
    }
  } else {
    const response = { Status: "Failure", Details: "Bad Request" };
    return ctx.err(400, {}, response);
  }
};
// const verifyOTPUser = async (ctx) => {
//   const { verification_key, otp, check } = ctx.request.body;
//   let currentdate = new Date();
//   let decoded;
//   try {
//     decoded = await decode(verification_key);
//   } catch (error) {
//     ctx.err(400, error);
//   }

//   let obj = JSON.parse(decoded);
//   const check_obj = obj.check;
//   if (check_obj != check) {
//     const response = {
//       status: "Failure",
//       Details: "OTP was not to this particular phone number",
//     };
//     return ctx.err(400, {}, response);
//   }

//   let params = {
//     id: obj.otp_id,
//   };

//   const otpResult = await Otp.findByPk(params.id);
//   const result = otpResult;
//   if (result != null) {
//     // Check if OTP is already used or not
//     if (result.verified != true) {
//       // Check if OTP is expired or not
//       if (dates.compare(result.expiration_time, currentdate) == 1) {
//         // Check if OTP is equal to the OTP in the DB
//         if (otp == result.otp) {
//           let params_verified = {
//             id: result.id,
//             verified: true,
//           };
//           await Otp.update(
//             {
//               verified: params_verified.verified,
//             },
//             {
//               where: {
//                 id: params_verified.id,
//               },
//             }
//           );
//           await User.update(
//             {
//               Status: params_verified.verified,
//             },
//             {
//               where: {
//                 otp_id: params_verified.id,
//               },
//             }
//           );

//           const clientResult = await User.findOne({
//             where: { contact: check },
//           });
//           if (!clientResult) {
//             const response = {
//               Status: "Succes",
//               Details: "new",
//               Check: check,
//             };
//             return ctx.ok(200, response);
//           } else {
//             const response = {
//               Status: "Succes",
//               Details: "old",
//               Check: check,
//               ClientName: clientResult.uername,
//             };
//             return ctx.ok(200, response);
//           }
//         } else {
//           const response = { Status: "Failure", Details: "OTP NOT Matched" };
//           return ctx.err(400, {}, response);
//         }
//       } else {
//         const response = { Status: "Failure", Details: "OTP Expired" };
//         return ctx.err(400, {}, response);
//       }
//     } else {
//       const response = { Status: "Failure", Details: "OTP Already Used" };
//       return ctx.err(400, {}, response);
//     }
//   } else {
//     const response = { Status: "Failure", Details: "Bad Request" };
//     return ctx.err(400, {}, response);
//   }
// };

module.exports = { newOTP, verifyOTP };
