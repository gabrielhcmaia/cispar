package br.com.cispar.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.OffsetDateTime;
import java.util.List;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    record ApiError(int status, String error, String message, List<String> details, OffsetDateTime timestamp) {}

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
        List<String> details = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();
        return ResponseEntity.badRequest().body(
                new ApiError(400, "Bad Request", "Erro de validação", details, OffsetDateTime.now())
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiError(404, "Not Found", ex.getMessage(), null, OffsetDateTime.now())
        );
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiError> handleNoResource() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ApiError(404, "Not Found", "Recurso não encontrado", null, OffsetDateTime.now())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneral(Exception ex, HttpServletRequest request) {
        log.error("Erro não tratado em {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.internalServerError().body(
                new ApiError(500, "Internal Server Error", "Erro interno inesperado", null, OffsetDateTime.now())
        );
    }
}
