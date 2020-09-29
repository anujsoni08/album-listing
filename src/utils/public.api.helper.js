import { publicAxiosInstance } from "./api";

export const handleAlbumList = async () => {
  try {
    const res = await publicAxiosInstance.get("albums");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const handleUserList = async () => {
  try {
    const res = await publicAxiosInstance.get("users");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const handleAlbumItemList = async (albumId) => {
  try {
    const res = await publicAxiosInstance.get(`albums/${albumId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const handleAlbumPhotosList = async (userId) => {
  try {
    const res = await publicAxiosInstance.get(`album/${userId}/photos`);
    return res.data;
  } catch (error) {
    return error;
  }
};
