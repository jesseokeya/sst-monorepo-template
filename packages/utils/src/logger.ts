/* eslint-disable @typescript-eslint/no-explicit-any */
import winston, { format, transports } from 'winston';

type Meta =
	| Record<string, any>
	| undefined
	| null
	| string
	| number
	| boolean
	| Error
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	| unknown;

const customLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 4,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		http: 'magenta',
		debug: 'blue',
	},
};

// Apply colors to winston based on custom levels
winston.addColors(customLevels.colors);

/**
 * Logger class to provide a singleton logger instance using Winston.
 * Supports multiple log levels, colorized output, and structured logs.
 */
class Logger {
	private static instance: Logger;
	private winstonLogger: winston.Logger;

	/**
	 * Private constructor to prevent direct instantiation.
	 */
	private constructor() {
		const isProduction = process.env.NODE_ENV === 'production';

		// Read the log level from the environment variable or default to 'info'
		const logLevel = process.env.LOG_LEVEL || 'info';
		this.winstonLogger = winston.createLogger({
			levels: customLevels.levels, // Custom log levels
			level: logLevel, // Default log level (can be configured via environment variables)
			format: format.combine(
				format.timestamp(), // Add timestamp to log messages
				isProduction ? format.uncolorize() : format.colorize(), // Colorize log output based on log levels
				format.printf(({ timestamp, level, message, ...meta }) => {
					// Serialize message and metadata as single-line JSON strings to prevent multiline logs
					let logMessage = typeof message === 'object' ? JSON.stringify(message) : message;

					// Check if meta (second argument) is passed and is an object
					if (Object.keys(meta).length > 0) {
						// eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-base-to-string
						logMessage += `, ${isProduction ? JSON.stringify(meta) : JSON.stringify(meta, null, 2)}`;
					}

					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
					return `${timestamp} [${level}]: ${logMessage}`;
				}),
			),
			transports: [
				new transports.Console({
					handleExceptions: true,
				}),
			],
			exitOnError: false,
		});
	}

	/**
	 * Returns the singleton instance of the Logger class.
	 *
	 * @returns {Logger} The singleton Logger instance
	 */
	public static getInstance(): Logger {
		if (!Logger.instance) {
			Logger.instance = new Logger();
		}

		return Logger.instance;
	}

	/**
	 * Info-level log with automatic object handling.
	 *
	 * @param {string} message The log message.
	 * @param {object} [meta] Optional metadata or object to log.
	 */
	public info(message: string, meta: Meta = ''): void {
		this.winstonLogger.info(message, meta);
	}

	/**
	 * Debug-level log with automatic object handling.
	 *
	 * @param {string} message The log message.
	 * @param {object} [meta] Optional metadata or object to log.
	 */
	public debug(message: string, meta: Meta = ''): void {
		this.winstonLogger.debug(message, meta);
	}

	/**
	 * Warn-level log with automatic object handling.
	 *
	 * @param {string} message The log message.
	 * @param {object} [meta] Optional metadata or object to log.
	 */
	public warn(message: string, meta: Meta = ''): void {
		this.winstonLogger.warn(message, meta);
	}

	/**
	 * Error-level log with automatic object handling.
	 *
	 * @param {string} message The log message.
	 * @param {object} [meta] Optional metadata or object to log.
	 */
	public error(message: string, meta: Meta = ''): void {
		this.winstonLogger.error(message, meta);
	}

	/**
	 * HTTP-level log with automatic object handling.
	 *
	 * @param {string} message The log message.
	 * @param {object} [meta] Optional metadata or object to log.
	 */
	public http(message: string, meta: Meta = ''): void {
		this.winstonLogger.log('http', message, meta);
	}
}

export { Logger };
