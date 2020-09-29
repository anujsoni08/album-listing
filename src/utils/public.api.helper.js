import { publicAxiosInstance } from "./api";

export async function handleAlbumList() {
  try {
    const res = await publicAxiosInstance.get("albums");
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function handleUserList() {
  try {
    const res = await publicAxiosInstance.get("users");
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function handleAlbumItemList(albumId) {
  try {
    const res = await publicAxiosInstance.get(`albums/${albumId}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function handleAlbumPhotosList(userId) {
  try {
    const res = await publicAxiosInstance.get(`album/${userId}/photos`);
    return res.data;
  } catch (error) {
    return error;
  }
}
