'use client'

import { donwloadImage, fetchStatusImageProcess } from "@/services/imageApi"
import { StatusProcess } from "@/types/enumStatus"
import { ResponseStatus } from "@/types/interfacesImageApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "../ui/Button"
import { useState } from "react"

interface ProcessProp {
    imageStatus: ResponseStatus,
    setProcess: (status: StatusProcess) => void
}
export function Processing({ imageStatus, setProcess }: ProcessProp) {
    const jobId: string = imageStatus.data.jobId;
    const [downloadError, setDownloadError] = useState<string | null>(null);
    const { data, error, refetch, isFetching } = useQuery<ResponseStatus>({
        queryKey: ['image-status', jobId],
        queryFn: () => fetchStatusImageProcess(jobId),
        initialData: imageStatus,
        refetchInterval: (query: any) => {
            const currentData = query?.state?.data as ResponseStatus | undefined;
            const status = currentData?.data?.status;
            if (query?.state?.errorUpdateCount > 3) return false;
            if (status === StatusProcess.completed || status === StatusProcess.failed) return false;
            return 2000;
        },
        staleTime: 1 * 1000,
        gcTime: 3 * 1000
    })

    const downloadMutation = useMutation({
        mutationFn: () => donwloadImage(jobId),
        onSuccess: (blobData: Blob) => {
            setDownloadError(null);

            const url = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = url;
            link.download = `compressed-${jobId}.png`; 
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
        onError: (err: any) => {
            const message = err?.message || "Connection timeout or Server is unreachable. Please check your internet.";
            setDownloadError(`❌ ${message}`);
            
            setTimeout(() => setDownloadError(null), 5000);
        }
    })

    if(error) return (   
        <div className={`mt-[1em] flex flex-col gap-[0.6em] items-center rounded-lg p-[1em] text-black`}>
            <p className={`text-[1em]`}>⚠️ {error?.message || "Connection lost."}</p>
            <Button onClick={() => refetch()}>{ isFetching ? 'Retrying...' : 'Retry' }</Button>
        </div>
    )

    return (
        <div className={`mt-[1em] flex flex-col items-center rounded-lg p-[1em] text-black`}>
            { downloadError && (
                <div className="absolute -top-12 left-4 right-4 bg-red-50 border border-red-200 text-red-800 p-2 rounded-lg text-xs text-center font-medium shadow-md z-20">
                    <p>{downloadError}</p>
                </div>
            ) }
            <h5 className={`text-[1.5em] flex flex-row gap-[0.2em]`}>
                {`${data.data.status.toUpperCase()}`}
                {data.data.status !== StatusProcess.completed && data.data.status !== StatusProcess.failed && (
                    <>
                        <span className="animate-pulse delay-75">.</span>
                        <span className="animate-pulse delay-300">.</span>
                        <span className="animate-pulse delay-500">.</span>
                    </>
                )}
            </h5>
            <p className={`text-[1em]`}>{`${data.data.message}`}</p>
            { data.data.status === StatusProcess.completed && (
                <div className={`flex flex-col gap-[0.4em]`}>
                    <Button onClick={() => downloadMutation.mutate()} disabled={downloadMutation.isPending}>{ downloadMutation.isPending ? 'Downloading...' : 'Download' }</Button>
                    <Button onClick={() => setProcess(StatusProcess.idle)} colourBg="bg-none" colourtext="text-blue-800" className={`underline`}>{`Back to upload image`}</Button>
                </div>
            ) }
        </div>
    )
}