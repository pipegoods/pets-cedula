import { API_URL_FILES } from 'config/contans';

export const uploadFiles = async (image: File) => {
  const data = new FormData();
  data.append('file', image as File);
  data.append('upload_preset', 'pets-cedula');
  data.append('cloud_name', 'pipegoods');

  const response = await fetch(API_URL_FILES, {
    method: 'post',
    body: data,
  });

  return await response.json();
};
