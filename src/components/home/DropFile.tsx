'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/Button';
import { ResponseStatus } from '@/types/interfacesImageApi';
import { fetchUploadImage } from '@/services/imageApi';

export function DropFile() {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<boolean>(false)
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        },
        onDropAccepted: (file) => {
            setError(false);
            const fileImg: File = file[0]
            setPreview(URL.createObjectURL(fileImg))
            setFile(fileImg)
        },
          onDropRejected: () => {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
        },
    })

    const handleUpload = async () => {
        if(file) {
            const imageUpload = new FormData();
            imageUpload.append('file', file);
            const data: ResponseStatus = await fetchUploadImage(imageUpload);
            console.log(data)
        }
        
    }

    return (
        <div className={`flex flex-col gap-[1em] items-center`}>
            <div className={`relative mt-[1em] w-full h-[25em] rounded-lg p-[1em] ${isDragActive ? "bg-white" : "bg-violet-600"}`}>
                { error && (
                    <div className={`absolute p-[0.2em] bg-amber-200 rounded-md left-[25em] top-[0.5em]`}>
                        <p className={`text-red-600`}>{`⚠️ Unsupported file type. Please upload a JPG, PNG, or WebP image.`}</p>
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
            <Button className={`active:scale-95 w-[6em] hover:bg-red-700`} onClick={handleUpload}>Upload</Button>
        </div>
    )
}