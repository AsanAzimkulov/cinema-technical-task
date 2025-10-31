// Base types from OpenAPI spec
export interface User {
  id: number;
  name: string;
  password_hash: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}

export interface Cinema {
  id: number;
  name: string;
  address: string;
}

export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}

export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface MovieSessionWithSeats extends MovieSession {
  seats: {
    rows: number;
    seatsPerRow: number;
  };
}

export interface MovieSessionDetails extends MovieSessionWithSeats {
  bookedSeats: Seat[];
}

export interface Booking {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: string;
  seats: Seat[];
  isPaid: boolean;
}

export interface Settings {
  bookingPaymentTimeSeconds: number;
}

export interface ErrorResponse {
  message: string;
  error?: string;
}

// API Request/Response types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export interface BookingRequest {
  seats: Seat[];
}

export interface BookingResponse {
  bookingId: string;
}

export interface PaymentResponse {
  message: string;
}

// Extended types for UI
export interface BookingWithDetails extends Booking {
  movie?: Movie;
  cinema?: Cinema;
  movieSession?: MovieSession;
  timeLeft?: number;
}

export interface MovieWithSessions extends Movie {
  sessions: MovieSession[];
}

export interface CinemaWithSessions extends Cinema {
  sessions: MovieSession[];
}

// Form validation schemas
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  passwordConfirmation: string;
}
