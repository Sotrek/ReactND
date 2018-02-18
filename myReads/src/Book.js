import React from 'react';
import './App.css';

const Book = (props) => {
	const { books, ShelfChange } = props;
	return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 &&
            books.map(singleBook => {
              const { id, imageLinks, title, shelf, authors } = singleBook;
              const thumbnail = imageLinks ? singleBook.imageLinks.thumbnail :`http://via.placeholder.com/193x128`
              return (
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