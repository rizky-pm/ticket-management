export const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const filterData = (array, status, search) => {
  if (status === '' && search === '') {
    return array;
  }

  const newArray = array.filter((item) => {
    return (
      item.title.toLocaleLowerCase().includes(search) ||
      item.customerName.toLocaleLowerCase().includes(search) ||
      item.statusName.toLocaleLowerCase().includes(search) ||
      item.picName.toLocaleLowerCase().includes(search) ||
      item.priorityName.toLocaleLowerCase().includes(search) ||
      item.productName.toLocaleLowerCase().includes(search)
    );
  });

  const filteredArray = newArray.filter((item) => {
    if (status === '') {
      return item;
    }

    return item.statusName === status;
  });

  return filteredArray;
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

export const fileToBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    cb(null, reader.result);
  };
  reader.onerror = (error) => {
    cb(error, null);
  };
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

export const renderFile = (file) => {
  // let ext;

  // if (['bmp', 'jpg', 'jpeg', 'gif', 'png'].includes(file.fileExt)) {
  //   ext = 'image/' + file.fileExt;
  // } else {
  //   ext = 'application/' + file.fileExt;
  // }

  const linkSource = file.fileName;
  // const linkSource = `data:${ext};base64,${file.fileName}`;

  return linkSource;
};
