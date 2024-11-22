package com.book.book_review.repository;

import com.book.book_review.model.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepo extends CrudRepository<Book, Integer> {
}
