const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  CONFLICT: 409,
  FORBIDDEN: 403
};

const MESSAGE = {
  REQUIRED_FIELDS: "All fields are required",
  USER_EXISTS: "User already exists",
  USER_CREATED: "User created successfully",
  INVALID_CREDENTIALS: "Invalid email or password",
  LOGIN_SUCCESS: "Login successful",
  USER_NOTFOUND : "User not found",
  NO_TOKEN : "No token provided",
  INVALID_EXPIRED_TOKEN : "Invalid or expired token",
  NO_ID : "Id not found",
  USER_FETCH_SUCCESSFULLY : "User fetch successfully",
  NO_REFRESH_TOKEN : "Refresh token required",
  TOKEN_REFRESHED : "Token refreshed",
  PRODUCT_EXISTS: "Product already exists",
  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_FETCH_SUCCESSFULLY : "Product fetch successfully",
  PRODUCT_NOT_FOUND : "No product found",
  NOT_AUTHORIZED: "Don't have access",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully"
};

const sendresponse = (res, status, message, data = null) =>{
    return res.status(status).json({
        success : status < 400,
        message,
        data
    });
};

module.exports = { STATUS, MESSAGE, sendresponse };