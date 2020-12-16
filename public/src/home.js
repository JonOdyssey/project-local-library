function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let borrowedBooks = books.filter((book) => {
    let borrowsArrZ = book.borrows[0];
    return borrowsArrZ.returned === false;
  });
  return borrowedBooks.reduce((acc, value) => (acc += 1), 0);
}

//helper function for Function 4 & 6
function sortandSplice(array) { 
  return array.sort((obj1, obj2) => obj2.count - obj1.count).splice(0, 5);
}

function getMostCommonGenres(books) {
  const mapBooks = books.map((book) => book.genre);
  const genreCount = mapBooks.reduce((acc, genre) => {
    if (!acc[genre]) {
      acc[genre] = 0;
    }
    acc[genre]++;
    return acc;
  }, {});

  const correctFormat = Object.keys(genreCount).map((key) => ({
    name: key,
    count: genreCount[key],
  }));
  return sortandSplice(correctFormat);
}

function getMostPopularBooks(books) {
  const booksCounted = [];
  for (let index in books) {
    const bookTitle = books[index].title;
    const bookBorrowsCount = books[index].borrows.length;
    const titleAndCount = { name: bookTitle, count: bookBorrowsCount };
    booksCounted.push(titleAndCount);
  }
  booksCounted.sort((bookA, bookB) => bookB.count - bookA.count);
  return booksCounted.splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popAuthorArr = books.reduce((accu, book) => {
    const doesExist = accu.find((objInAcc) => objInAcc.authorId === book.authorId); //check the accu if an author obj has already been defined
    const bookAuthor = authors.find((author) => author.id === book.authorId);
    if (!doesExist) {
      accu.push({
        name: `${bookAuthor.name.first} ${bookAuthor.name.last}`,
        count: book.borrows.length,
      });
    } else {
      doesExist.count += book.borrows.length;
    }
    return accu;
  }, []);
  return sortandSplice(popAuthorArr);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
