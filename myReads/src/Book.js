import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import './App.css';

const Book = (props) => {
	const { books } = props;
	return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 &&
            books.map(singleBook => {
              const { id, imageLinks, title, authors } = singleBook;
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
                      <BookShelfChanger/>
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