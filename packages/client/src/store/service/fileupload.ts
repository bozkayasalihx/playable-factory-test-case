import baseApi from "./baseApi";

export const fileUploadApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        uploadImage: builder.mutation<{ data: { fileName: string } }, FormData>(
            {
                query: formData => ({
                    url: "/image-upload",
                    method: "POST",
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }),
            }
        ),

        uploadFile: builder.mutation<{ data: { fileName: string } }, FormData>({
            query: formData => ({
                url: "/file-upload",
                method: "POST",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useUploadFileMutation, useUploadImageMutation } = fileUploadApi;
