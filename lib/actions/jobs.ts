import { JobPostData } from "@/types/job-post-data"
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const createJob = async (jobPostData: JobPostData, onSuccess?: () => void, onError?: () => void): Promise<void> => {

    try {
        const res = await fetch(`${baseUrl}/jobs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobPostData)
        });
        if (!res.ok) {
            const errorData = await res.json();
            const errorMessage = errorData?.message || "Failed to create job post. Please try again later.";
            throw new Error(errorMessage);

        }
        const result = await res.json();
        toast.success(result?.message);
        onSuccess?.();
    } catch (err) {
        toast.error((err as Error).message);
        onError?.();
    }
}