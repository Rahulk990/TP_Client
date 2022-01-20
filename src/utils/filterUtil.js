export const filterAndSortList = (list, value) => {
  const tempList = [];
  list.slice().forEach((contact) => {
    if (contact.fullName.toUpperCase().indexOf(value) === 0) {
      tempList.push(contact);
    }
  });
  tempList.sort((a, b) => b.score - a.score);
  return tempList;
};
