package br.com.cispar.shared.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException( Object id) {
        super( "não encontrado com id: " + id);
    }
}
