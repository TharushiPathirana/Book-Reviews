package com.book.book_review.dto;

import com.book.book_review.model.Book;
import lombok.Data;

@Data
public class ReviewDto {
    private String title;
    private String reviewText;
    private Integer rating;
    private int bookId;
    private int userId;
}
