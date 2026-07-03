# CFactor Image Processing Frontend

Frontend application built with **Next.js** for uploading images, monitoring processing status, and downloading processed images from the backend image processing service.

## Features

* Upload images using drag-and-drop or file picker
* Display upload progress and processing status
* Poll job status until processing is complete
* Download processed images
* Responsive user interface
* Built with TypeScript

---

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query
* React Dropzone

---

## Project Structure

```text
src/
├── app/                 # App Router pages and layouts
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Shared utilities and application configuration
├── services/            # API communication with the backend
├── types/               # Shared TypeScript types
└── providers/           # React context providers (e.g., TanStack Query Provider)
```

---

## Prerequisites

Before running the application, make sure the following software is installed:

* Node.js 22 or later
* pnpm
* Backend Image Processing API is running

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Salthof28/fe-cfactor-image-processing-web.git
cd fe-cfactor-image-processing-web
```

Install dependencies:

```bash
pnpm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
API_BE=http://localhost:4000
```

| Variable              | Description                                   |
| --------------------- | --------------------------------------------- |
| `API_BE`              | Base URL of the backend Image Processing API. |

> **Note:** Ensure the backend application is running before starting the frontend.

---

## Running the Application

Start the development server:

```bash
pnpm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Usage

### 1. Upload an Image

* Drag and drop an image into the upload area, or
* Click the upload area to select an image from your device.

After a successful upload, the backend returns a `jobId` used to track the processing status.

---

### 2. Monitor Processing Status

The application automatically polls the backend using the returned `jobId`.

Possible statuses:

* `pending` — Image is waiting to be processed.
* `processing` — Image is currently being processed.
* `completed` — Image processing finished successfully.
* `failed` — Image processing failed.

Polling automatically stops when the job reaches either the `completed` or `failed` state.

---

### 3. Download the Processed Image

When the job status becomes `completed`, a download button will be displayed.

Clicking the button downloads the processed WebP image from the backend.

---

## Backend Dependency

This frontend depends on the backend Image Processing API.

Ensure the backend server and Redis are running before using the application.

Default backend URL:

```text
http://localhost:4000
```

---

## License

This project was created for technical assessment purposes.

---

## Author
🔧 Salman Althof
