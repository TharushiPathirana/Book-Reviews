package com.book.book_review.service;

import com.book.book_review.dto.ReviewDto;
import com.book.book_review.mapper.ReviewMapper;
import com.book.book_review.model.Review;
import com.book.book_review.model.UserPrincipal;
import com.book.book_review.repository.BookRepo;
import com.book.book_review.repository.ReviewRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    ReviewRepo reviewRepo;

    @Autowired
    BookRepo bookRepo;

    @Autowired
    private ReviewMapper reviewMapper;

    public List<ReviewDto> getAllReviews() {
        List<Review> reviews = (List<Review>) reviewRepo.findAll();
        return reviews.stream()
                .map(reviewMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ReviewDto> getReview(int id) {
        return Optional.ofNullable(reviewRepo.findById(id)
                .map(reviewMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Review not found")));
    }

    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = reviewMapper.toEntity(reviewDto);
        Review savedReview = reviewRepo.save(review);
        return reviewMapper.toDTO(savedReview);
    }

    public ReviewDto updateReview(int reviewId, ReviewDto reviewDto) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        int currentUserId = currentUser.getUserId();
        Review review = reviewRepo.findById(reviewId).orElse(null);
        if (review == null) {
            throw new RuntimeException("Review not found");
        }

        if (review.getUser().getId() != currentUserId) {
            throw new RuntimeException("User not authorized");
        }

        review.setTitle(reviewDto.getTitle());
        review.setReviewText(reviewDto.getReviewText());
        review.setRating(reviewDto.getRating());

        Review updatedReview = reviewRepo.save(review);

        return reviewMapper.toDTO(updatedReview);
    }

    public boolean deleteReview(int reviewId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int currentUserId = currentUser.getUserId();
        Review review = reviewRepo.findById(reviewId).orElse(null);
        if (review == null) {
            return false;
        }
        if (review.getUser().getId() != currentUserId) {
            throw new RuntimeException("User not authorized");
        }
        reviewRepo.delete(review);
        return true;
    }
}
