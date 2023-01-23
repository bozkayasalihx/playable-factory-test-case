import { AWSError, S3 } from "aws-sdk";
type Config = {
    accessKeyId: string;
    secretAccessKey;
};

const IMAGE_BUCKET_NAME = "testcaseimageupload";
const FILE_BUCKET_NAME = "testcaseuserfile";
class AwsS3 {
    private s3bucket: S3;
    constructor() {
        this.configure();
    }
    public configure() {
        const accessKey = process.env.AWS_ACCESSS_KEY;
        const secretKey = process.env.AWS_SECRET_KEY;

        if (!accessKey || !secretKey) {
            console.log("set up the credentials first");
            return;
        }
        const s3 = new S3({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
        });
        this.s3bucket = s3;
    }

    public uploadImageToS3(image: Buffer | string, filename: string) {
        let fileContent: Buffer;
        if (!(image instanceof Buffer) && typeof image === "string") {
            fileContent = Buffer.from(image, "binary");
        }
        fileContent = image as Buffer;
        return this.s3bucket
            .upload({
                Bucket: IMAGE_BUCKET_NAME,
                Key: filename,
                Body: fileContent,
            })
            .promise();
    }

    public async retrieveImageFromS3(filename: string) {
        let result: {
            error: null | AWSError;
            data?: S3.GetObjectOutput;
        } = {
            error: null,
        };
        try {
            const data = await this.s3bucket
                .getObject({
                    Bucket: IMAGE_BUCKET_NAME,
                    Key: filename,
                })
                .promise();

            result.data = data;
        } catch (err) {
            result.error = err?.message || "error accured";
        }

        return result;
    }

    public deleteImageFromS3(filename: string) {
        return this.s3bucket
            .deleteObject({
                Bucket: IMAGE_BUCKET_NAME,
                Key: filename,
            })
            .promise();
    }

    public deleteFileFromS3(filename: string) {
        return this.s3bucket
            .deleteObject({
                Bucket: FILE_BUCKET_NAME,
                Key: filename,
            })
            .promise();
    }

    public listAllImages() {
        return this.s3bucket
            .listObjects({ Bucket: IMAGE_BUCKET_NAME, MaxKeys: 2 })
            .promise();
    }

    public uploadFileToS3(file: Buffer | string, filename: string) {
        let fileContent: Buffer;
        if (!(file instanceof Buffer) && typeof file === "string") {
            fileContent = Buffer.from(file, "binary");
        }
        fileContent = file as Buffer;
        return this.s3bucket
            .upload({
                Bucket: FILE_BUCKET_NAME,
                Key: filename,
                Body: fileContent,
            })
            .promise();
    }
}

export const s3FileUpload = new AwsS3();
