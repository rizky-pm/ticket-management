export const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const downloadFile = (file) => {
  let ext;

  if (['bmp', 'jpg', 'jpeg', 'gif', 'png'].includes(file.fileExt)) {
    ext = 'image/' + file.fileExt;
  } else {
    ext = 'application/' + file.fileExt;
  }

  const linkSource = `data:${ext};base64,${file.fileName}`;
  const downloadLink = document.createElement('a');
  const fileName = `attachment.${file.fileExt}`;

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
