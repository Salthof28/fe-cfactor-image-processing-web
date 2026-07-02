interface DataStatus {
    jobId: string,
    status: string,
    message: string
}

export interface ResponseStatus {
    message: string,
    data: DataStatus
}