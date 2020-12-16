function findAuthorById(authors, id) {
  const authorsById = authors.reduce((accu, author) => {
    accu[author.id] = author;
    return accu;
  }, {});

  return authorsById[id];
}

function findBookById(books, id) {
  const booksById = books.reduce((accu, book) => {
    accu[book.id] = book;
    return accu;
  }, {});
  return booksById[id];
}

function partitionBooksByBorrowedStatus(books) {
  const borBooks = books.filter((book) => book.borrows[0].returned === false);
  const retBooks = books.filter((book) => book.borrows[0].returned === true);
  return [borBooks, retBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowArr = [];
  const borrowLog = book.borrows;
  const accountIds = accounts.reduce((accu, account) => {
    accu[account.id] = account;
    return accu;
  }, {});
  for (let index in borrowLog){
    for (let jndex in accountIds) {
      if (accountIds[jndex].id === borrowLog[index].id) {
        const { returned } = borrowLog[index];
        accountIds[jndex]["returned"] = returned;
        borrowArr.push(accountIds[jndex]);
      }
    }
  }
  return borrowArr.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
