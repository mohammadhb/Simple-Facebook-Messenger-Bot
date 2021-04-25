/**
 * Informational
 */
exports.HTTP_CONTINUE = 100;
exports.HTTP_SWITCHING_PROTOCOLS = 101;
exports.HTTP_PROCESSING = 102; // RFC2518

/**
 * Success
 */
exports.HTTP_OK = 200;
exports.HTTP_CREATED = 201;
exports.HTTP_ACCEPTED = 202;
exports.HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
exports.HTTP_NO_CONTENT = 204;
exports.HTTP_RESET_CONTENT = 205;
exports.HTTP_PARTIAL_CONTENT = 206;
exports.HTTP_MULTI_STATUS = 207; // RFC4918
exports.HTTP_ALREADY_REPORTED = 208; // RFC5842
exports.HTTP_IM_USED = 226; // RFC3229

/**
 * Redirection
 */
exports.HTTP_MULTIPLE_CHOICES = 300;
exports.HTTP_MOVED_PERMANENTLY = 301;
exports.HTTP_FOUND = 302;
exports.HTTP_SEE_OTHER = 303;
exports.HTTP_NOT_MODIFIED = 304;
exports.HTTP_USE_PROXY = 305;
exports.HTTP_RESERVED = 306;
exports.HTTP_TEMPORARY_REDIRECT = 307;
exports.HTTP_PERMANENTLY_REDIRECT = 308; // RFC7238

/**
 * Client Error
 */
exports.HTTP_BAD_REQUEST = 400;
exports.HTTP_UNAUTHORIZED = 401;
exports.HTTP_PAYMENT_REQUIRED = 402;
exports.HTTP_FORBIDDEN = 403;
/**
 * The requested resource could not be found
 *
 * Note: This is sometimes used to mask if there was an UNAUTHORIZED (401) or
 * FORBIDDEN (403) error, for security reasons
 */
exports.HTTP_NOT_FOUND = 404;
exports.HTTP_METHOD_NOT_ALLOWED = 405;
exports.HTTP_NOT_ACCEPTABLE = 406;
exports.HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
exports.HTTP_REQUEST_TIMEOUT = 408;
exports.HTTP_CONFLICT = 409;
exports.HTTP_GONE = 410;
exports.HTTP_LENGTH_REQUIRED = 411;
exports.HTTP_PRECONDITION_FAILED = 412;
exports.HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
exports.HTTP_REQUEST_URI_TOO_LONG = 414;
exports.HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
exports.HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
exports.HTTP_EXPECTATION_FAILED = 417;
exports.HTTP_I_AM_A_TEAPOT = 418; // RFC2324
exports.HTTP_UNPROCESSABLE_ENTITY = 422; // RFC4918
exports.HTTP_LOCKED = 423; // RFC4918
exports.HTTP_FAILED_DEPENDENCY = 424; // RFC4918
exports.HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425; // RFC2817
exports.HTTP_UPGRADE_REQUIRED = 426; // RFC2817
exports.HTTP_PRECONDITION_REQUIRED = 428; // RFC6585
exports.HTTP_TOO_MANY_REQUESTS = 429; // RFC6585
exports.HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431; // RFC6585

/**
 * The server encountered an unexpected error
 */
exports.HTTP_INTERNAL_SERVER_ERROR = 500;
exports.HTTP_NOT_IMPLEMENTED = 501;
exports.HTTP_BAD_GATEWAY = 502;
exports.HTTP_SERVICE_UNAVAILABLE = 503;
exports.HTTP_GATEWAY_TIMEOUT = 504;
exports.HTTP_VERSION_NOT_SUPPORTED = 505;
exports.HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506; // RFC2295
exports.HTTP_INSUFFICIENT_STORAGE = 507; // RFC4918
exports.HTTP_LOOP_DETECTED = 508; // RFC5842
exports.HTTP_NOT_EXTENDED = 510; // RFC2774
exports.HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;