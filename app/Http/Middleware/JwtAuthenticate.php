<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthenticate
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken() ?: $request->cookie('token');

        if (! $token) {
            return redirect('/login');
        }

        try {
            $payload = JWT::decode($token, new Key((string) config('services.jwt.secret'), 'HS256'));
            $user = User::query()->find((int) $payload->sub);

            if (! $user) {
                return redirect('/login');
            }

            $request->attributes->set('jwt_user', $user);
        } catch (\Throwable) {
            return redirect('/login');
        }

        return $next($request);
    }
}
