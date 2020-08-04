const conversor = (url) => {
  console.log('hola desde que');
  console.log(url);
  let newUrl = url.split('/');
  if (newUrl.length > 0) {
    console.log('hola desde aca');
    let srtAddress = `${newUrl[0]}//${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${newUrl[5]}/${newUrl[6]}/results`;
    console.log(srtAddress);
    return srtAddress;
  }
  return '';
};
export {conversor};
