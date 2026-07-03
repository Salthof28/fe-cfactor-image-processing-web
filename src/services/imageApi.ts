"use server"

import { DownloadResponse, NestJsErrorFeedback, ResponseStatus } from "@/types/interfacesImageApi";

const API_SMARANCH = process.env.API_BE;

export async function fetchUploadImage(file: FormData): Promise<ResponseStatus> {
    try {
        const response: Response = await fetch(`${API_SMARANCH}/image/upload`, {
            method: "POST",
            body: file 
        }) 
        if (!response.ok) {
            const errorData: NestJsErrorFeedback = await response.json(); 
            throw errorData; 
        }
        return response.json()
    } catch (error: unknown) {
        const apiError = error as NestJsErrorFeedback;
        throw apiError.message
    }
}

export async function fetchStatusImageProcess(jobId: string): Promise<ResponseStatus> {
    try {
        const response: Response = await fetch(`${API_SMARANCH}/image/${jobId}`) 
        if (!response.ok) {
            const errorData: NestJsErrorFeedback = await response.json(); 
            throw errorData; 
        }
        return response.json()
    } catch (error: unknown) {
        const apiError = error as NestJsErrorFeedback;
        throw apiError.message
    }
}

export async function downloadImage(jobId: string): Promise<DownloadResponse> {
    try {
        const response = await fetch(`${API_SMARANCH}/image/${jobId}/download`);
        if (!response.ok) {
            const errorData: NestJsErrorFeedback = await response.json(); 
            throw errorData; 
        }
        return {
            blobData: await response.blob(),
            fileName: getFileName(response.headers, jobId),
        };
    } catch (error: unknown) {
        const apiError = error as NestJsErrorFeedback;
        throw apiError.message
    }
}

function getFileName(headers: Headers, jobId: string): string {
    const contentDisposition = headers.get("content-disposition");

    if (!contentDisposition) return `compressed-${jobId}.webp`;
    
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
    return matches?.[1] ? matches[1].replace(/['"]/g, "") : `compressed-${jobId}.webp`;
}