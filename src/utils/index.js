export const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const filterData = (array, status) => {
  if (status === '') {
    return array;
  }

  return array.filter((item) => item.statusName === status);
};

export const getTableLength = (array, filterSelect, filterSearch) => {
  let newArr = array.filter((el) => {
    return el.type === filterSelect;
  });

  let newlyArr = [];

  if (newArr.length === 0) {
    newlyArr = array.filter((el) => {
      return el?.statusName.toLocaleLowerCase().includes(filterSearch);
    });
  } else {
    newlyArr = newArr.filter((el) => {
      return el?.statusName.toLocaleLowerCase().includes(filterSearch);
    });
  }

  return newlyArr.length;
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
