import axios from "axios";

export const uploadImage = async (img) => {
  try {
    // Step 1: Get the pre-signed upload URL from the server
    const { data: { uploadURL } } = await axios.get(
      import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url"
    );

    // Step 2: Upload the image directly to that URL
    await axios.put(uploadURL, img, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Step 3: Return the clean image URL (without query params)
    const imgUrl = uploadURL.split("?")[0];
    return imgUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};
