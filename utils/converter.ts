export const stringToNumber = (input: string | number): string => {
    if(typeof input === 'number') {
        return input.toString()
    }

    return input
}

export const spliceName = (name : string) => {
    const arrayName = name.split(/(\s+)/);
    if (arrayName.length > 1) {
      return {
        firstName: arrayName[0],
        lastName: ''
      }
    }
  
    const firstName = arrayName.splice(0, 2).join()
    const lastName = arrayName.join()
  
    return {
      firstName: firstName,
      lastName: lastName
    }
  }