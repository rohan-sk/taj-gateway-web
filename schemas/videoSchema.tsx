export const fetchVideoSchema = (
    name: string,
    description: string,
    videoUrl: string,
    uploadDate: string,
    duration: string,
    thumbnailUrl: string,
    embedUrl: string
) => {
    return {
        "@context": "http://schema.org",
        "@type": "VideoObject",
        name: name || "",
        description: description || "",
        thumbnailUrl: thumbnailUrl || "",
        uploadDate: uploadDate || "",
        duration: duration || "",
        contentUrl: videoUrl || "",
        embedUrl: embedUrl || "",
    };
};
