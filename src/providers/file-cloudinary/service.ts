import {
	AbstractFileProviderService,
	MedusaError,
} from "@medusajs/framework/utils";
import {
	Logger,
	ProviderDeleteFileDTO,
	ProviderFileResultDTO,
	ProviderUploadFileDTO,
} from "@medusajs/framework/types";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

type InjectedDependencies = {
	logger: Logger;
};

type Options = {
	apiKey: string;
	apiSecret: string;
	cloudName: string;
	secure?: boolean;
	folderName?: string;
};

class CloudinaryFileProviderService extends AbstractFileProviderService {
	protected logger_: Logger;
	protected options_: Options;
	static identifier = "cloudinary";

	constructor({ logger }: InjectedDependencies, options: Options) {
		super();
		this.logger_ = logger;
		this.options_ = options;

		cloudinary.config({
			cloud_name: options.cloudName,
			api_key: options.apiKey,
			api_secret: options.apiSecret,
			secure: options.secure ?? true,
		});
	}

	static validateOptions(options: Options) {
		if (!options.apiKey || !options.apiSecret || !options.cloudName) {
			throw new MedusaError(
				MedusaError.Types.INVALID_DATA,
				"API key, API secret or Cloud Name is required in the cloudinary provider's options."
			);
		}
	}

	async upload(file: ProviderUploadFileDTO): Promise<ProviderFileResultDTO> {
		const publicId = this.generatePublicId(file.filename);

		// Convert binary-encoded string to Buffer
		const buffer = Buffer.from(file.content, "binary");

		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					resource_type: "auto",
					public_id: publicId,
					folder: this.options_?.folderName || undefined,
				},
				(error, result) => {
					if (error) return reject(error);
					if (!result)
						return reject(
							new Error("No result returned from Cloudinary upload.")
						);
					resolve({
						url: result.secure_url,
						key: result.public_id,
					});
				}
			);

			Readable.from(buffer).pipe(uploadStream);
		});
	}

	async delete(file: ProviderDeleteFileDTO): Promise<void> {
		await cloudinary.uploader.destroy(file.fileKey, { resource_type: "auto" });
	}

	async getAsBuffer(file: { fileKey: string }): Promise<Buffer> {
		const url = cloudinary.url(file.fileKey, { secure: true });
		const response = await fetch(url);
		return Buffer.from(await response.arrayBuffer());
	}

	async getDownloadStream(file: { fileKey: string }): Promise<Readable> {
		const url = cloudinary.url(file.fileKey, { secure: true });
		const response = await fetch(url);
		return Readable.fromWeb(response.body as any);
	}

	async getPresignedDownloadUrl(file: { fileKey: string }): Promise<string> {
		return cloudinary.url(file.fileKey, { secure: true });
	}

	// helper function
	private cleanFilename(filename: string): string {
		return filename
			.replace(/[^a-zA-Z0-9.\-_]/g, "_")
			.replace(/_+/g, "_")
			.replace(/^_+|_+$/g, "")
			.toLowerCase();
	}

	private generatePublicId(filename: string): string {
		const cleaned = this.cleanFilename(filename);
		const unique = uuidv4();
		return `${unique}_${cleaned}`;
	}
}

export default CloudinaryFileProviderService;
