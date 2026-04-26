<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLogin(Request $request): RedirectResponse|Response
    {
        if ($this->resolveUserFromToken($request) !== null) {
            return redirect('/home');
        }

        return Inertia::render('auth/Login');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return back()->withErrors([
                'email' => 'Credenciais invalidas.',
            ]);
        }

        $ttl = (int) config('services.jwt.ttl', 3600);
        $token = $this->generateToken($user, $ttl);

        return redirect('/home')->cookie(
            'token',
            $token,
            max(1, (int) ceil($ttl / 60)),
            '/',
            null,
            false,
            true,
            false,
            'Lax'
        );
    }

    public function logout(): RedirectResponse
    {
        return redirect('/login')->withoutCookie('token');
    }

    private function generateToken(User $user, int $ttl): string
    {
        $now = time();

        $payload = [
            'iss' => config('app.url'),
            'iat' => $now,
            'exp' => $now + $ttl,
            'sub' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
        ];

        return JWT::encode($payload, (string) config('services.jwt.secret'), 'HS256');
    }

    private function resolveUserFromToken(Request $request): ?User
    {
        $token = $request->cookie('token');
        if (! $token) {
            return null;
        }

        try {
            $payload = JWT::decode($token, new Key((string) config('services.jwt.secret'), 'HS256'));
            return User::query()->find((int) $payload->sub);
        } catch (\Throwable) {
            return null;
        }
    }
}
