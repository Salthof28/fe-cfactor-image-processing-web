'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/Button';
import { NestJsErrorFeedback, ResponseStatus } from '@/types/interfacesImageApi';
import { fetchUploadImage } from '@/services/imageApi';
import { StatusProcess } from '@/types/enumStatus';
import { Processing } from './Processing';
import { useMutation } from '@tanstack/react-query';

export function DropFile() {
    const [preview, setPreview] = useState<string | null>(null);
    const [statusProcess, setStatusProcess] = useState<StatusProcess>(StatusProcess.pending);
    const [imageStatus, setImageStatus] = useState<ResponseStatus>()
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        onDropAccepted: (file) => {
            setErrorMessage(null);
            const fileImg: File = file[0]
            setPreview(URL.createObjectURL(fileImg))
            setFile(fileImg)
        },
          onDropRejected: () => {
            setErrorMessage(`⚠️ Unsupported file type. Please upload a JPG, PNG, or WebP image.`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        },
    })

    const uploadMutation = useMutation({

        mutationFn: (formData: FormData) => fetchUploadImage(formData),
        
        onSuccess: (data: ResponseStatus) => {
            setErrorMessage(null)
            setPreview(null);
            setImageStatus(data);
            setStatusProcess(data.data.status);
            setFile(null); 
        },
        
        onError: (error: unknown) => {
            const serverError = (error) as NestJsErrorFeedback;
            const messageError = `⚠️ ${serverError.message}` || "⚠️ Something went wrong. Please try again.";
            setErrorMessage(messageError)
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        }
    })

    const handleUpload = async () => {
        if(file) {
            const imageUpload = new FormData();
            imageUpload.append('file', file);
            uploadMutation.mutate(imageUpload)
        }
        
    }

    if((statusProcess !== StatusProcess.idle) && imageStatus) return <Processing imageStatus={imageStatus} setProcess={(status) => setStatusProcess(status)} />

    return (
        <div className={`flex flex-col gap-[1em] items-center`}>
            <div className={`relative mt-[1em] w-full h-[25em] rounded-lg p-[1em] ${isDragActive ? "bg-white" : "bg-violet-600"}`}>
                { errorMessage && (
                    <div className={`absolute text-center p-[0.2em] bg-amber-200 rounded-md left-[15em] right-[15em] top-[0.5em]`}>
                        <p className={`text-red-600`}>{`${errorMessage}`}</p>
                    </div>
                ) }
                <div {...getRootProps()} className={`flex justify-center items-center w-full h-full border-[0.2em] border-dashed rounded-lg cursor-pointer ${isDragActive ? "border-violet-600" : "border-white"} p-[1em]`}>
                    <input {...getInputProps()} />
                    { !preview ? (<p className={`${isDragActive ? "text-violet-600" : "text-white"}`}>drag and drop file here or click in here for select file</p>) : (
                        <div className={` flex-col items-center justify-center h-full gap-[0.5em] ${isDragActive ? "hidden" : "flex"}`}>
                            <img src={preview} className={`max-h-[18em]`} />
                            <p className={`text-white`}>{file?.name}</p>
                        </div>
                    ) }
                </div>
            </div>
            <Button onClick={handleUpload} disabled={uploadMutation.isPending} className={`active:scale-95 w-[6em] hover:bg-red-700`} >Upload</Button>
        </div>
    )
}