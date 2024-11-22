package com.book.book_review.controller;

import com.book.book_review.dto.ReviewDto;
import com.book.book_review.model.Review;
import com.book.book_review.model.Users;
import com.book.book_review.service.ReviewService;
import com.book.book_review.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<?> getAllReviews() {
        try {
            List<ReviewDto> reviews = reviewService.getAllReviews();
            return ResponseEntity.ok(reviews);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Integer id) {
        try {
            Optional<ReviewDto> reviews = reviewService.getReview(id);
            if (reviews.isPresent()) {
                return ResponseEntity.ok(reviews.get());
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }

    }

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto) {
        try {
            ReviewDto savedReviewDto = reviewService.createReview(reviewDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedReviewDto);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book or User not found");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while saving the review");
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable int reviewId, @RequestBody ReviewDto reviewDto) {
        try {
            ReviewDto updatedReviewDto = reviewService.updateReview(reviewId, reviewDto);
            return ResponseEntity.ok(updatedReviewDto);
        } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");

        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewId) {
        try {
            boolean isDeleted = reviewService.deleteReview(reviewId);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).body("Review deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found with ID: " + reviewId);
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }













}
