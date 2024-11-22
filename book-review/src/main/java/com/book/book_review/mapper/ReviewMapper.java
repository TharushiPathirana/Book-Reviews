package com.book.book_review.mapper;

import com.book.book_review.dto.ReviewDto;
import com.book.book_review.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "book.id", target = "bookId")
    @Mapping(source = "user.id", target = "userId")
    ReviewDto toDTO(Review review);

    @Mapping(source = "bookId", target = "book.id")
    @Mapping(source = "userId", target = "user.id")
    Review toEntity(ReviewDto reviewDto);


}
