export interface AuthResponse {
    token: string;
    user_id: number;
    user_name: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}

