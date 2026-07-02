// import ApiError from "../utils/ApiError.js";

// const errorHandler = (err, req, res, next) => {
//   let error = err;

//   if (!(error instanceof ApiError)) {
//     error = new ApiError(
//       error.statusCode || 500,
//       error.message || "Internal Server Error"
//     );
//   }

//   return res.status(error.statusCode).json({
//     success: false,
//     message: error.message,
//     errors: error.errors || [],
//     stack:
//       process.env.NODE_ENV === "development"
//         ? error.stack
//         : undefined,
//   });
// };

// export default errorHandler;


const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;