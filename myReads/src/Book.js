import React from 'react';

const Book = (props) => {
  //destructuring the component `props` object into its individual variables
	const { books, ShelfChange } = props;
	return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {/*we are checking if there are any books returned */
          books.length > 0 &&
            //mapping the array of books to their html template
            books.map(singleBook => {
              //destructuring the singleBook object into its individual variables
              const { id, imageLinks, title, shelf, authors } = singleBook;
              //checking if there is an existing imageLink and if not sets a place holder of the same size
              const thumbnail = imageLinks ? singleBook.imageLinks.thumbnail :`http://via.placeholder.com/193x128`
              return (
                //id is important in lists for react to propaggate correctly any changes
                <li key={id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${thumbnail})`,
                        }}
                      />
                      <div className="book-shelf-changer">
                          {/* The dropdown menu will have as value the shelf it belongs to and if it doesnt set it to none
                           on change of this value trigger the ShelfChange function and pass it the event and the singleBook*/}
          					      <select value={shelf ? shelf : "none"} onChange={e => ShelfChange(e, singleBook)}>
          					        <option value="none" disabled>Move to...</option>
          					        <option value="currentlyReading">Currently Reading</option>
          					        <option value="wantToRead">Want to Read</option>
          					        <option value="read">Read</option>
          					        <option value="none">None</option>
          					      </select>
          				    </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">
                      {authors ? authors.join(", "): ""}
                    </div>
                  </div>
                </li>
              )
            })}
        </ol>
      </div>
    );
};

export default Book;