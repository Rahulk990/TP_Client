export const filterAndSortList = (list, value) => {
  const tempList = [];
  list.forEach((contact) => {
    if (contact.fullName.toUpperCase().indexOf(value) !== -1) {
      tempList.push(contact);
    }
  });
  tempList.sort((a, b) => {
    if (a.score === b.score) {
      return (
        b.fullName.toUpperCase().indexOf(value) -
        a.fullName.toUpperCase().indexOf(value)
      );
    } else return b.score - a.score;
  });
  return tempList;
};
