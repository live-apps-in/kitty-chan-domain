/////TODO - Handle Global Exception in Separate File

export class HttpException extends Error{
	constructor(
        public readonly message: string,
        public readonly statusCode: number,

	) { 
		super(message);
	}
}

export class ValidationException extends Error{
	constructor(
		public readonly message: string,
		public readonly error: any,
		public readonly statusCode: number
	) {
		super();
	}
}


