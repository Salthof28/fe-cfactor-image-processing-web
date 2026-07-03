"use server"

import { ResponseStatus } from "@/types/interfacesImageApi";

const API_SMARANCH = process.env.API_BE;

export async function fetchUploadImage(file: FormData): Promise<ResponseStatus> {
    try {
        const response: Response = await fetch(`${API_SMARANCH}/image/upload`, {
            method: "POST",
            body: file 
        }) 
        if (!response.ok) {
            const errorData = await response.json(); 
            throw errorData; 
        }
        return response.json()
    } catch (error: unknown) {
        throw error
    }
}

export async function fetchStatusImageProcess(jobId: string): Promise<ResponseStatus> {
    try {
        const response: Response = await fetch(`${API_SMARANCH}/image/${jobId}`) 
        if (!response.ok) {
            const errorData = await response.json(); 
            throw errorData; 
        }
        return response.json()
    } catch (error: unknown) {
        throw error
    }
}

export async function donwloadImage(jobId: string): Promise<Blob> {
    try {
        const response: Response = await fetch(`${API_SMARANCH}/image/${jobId}/download`);
        if (!response.ok) {
            const errorData = await response.json(); 
            throw errorData; 
        }
        return response.blob();
    } catch (error: unknown) {
        throw error
    }
}