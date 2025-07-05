import AxiosInterceptor from '../api/AxiosInterceptor';

export const uploadToS3 = async (file) => {
  const ext = file.name.split('.').pop();
  const contentType = file.type;

  // Step 1: Request a pre-signed URL via POST
  const res = await AxiosInterceptor.post('/s3/get-upload-url', {
    contentType,
    extension: ext
  });

  const { uploadURL, fileURL } = res.data;

  // Step 2: Upload the file to S3 directly using fetch
  await fetch(uploadURL, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType
    },
    body: file
  });

  return fileURL;
};
