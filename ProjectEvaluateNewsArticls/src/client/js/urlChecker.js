function validUrl(inputText) {
  let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  if (inputText.trim() === "") {
      return 0; // return 0 means that user input is empty
  } else {
      if (regex.test(inputText)) {
          return 2; // return 2 means that user input is a valid URL and the code can proceed
      }
      else {
          return 1; // return 1 means that user input isn't a valid URL
      }
  }
}

export { validUrl}
