import { StatusProcess } from "./enumStatus"

interface DataStatus {
    jobId: string,
    status: StatusProcess,
    message: string
}

export interface ResponseStatus {
    message: string,
    data: DataStatus
}

export interface NestJsErrorFeedback {
    message: string;
    error: string;
    statusCode: number;
}

export interface DownloadResponse {
    blobData: Blob;
    fileName: string;
}