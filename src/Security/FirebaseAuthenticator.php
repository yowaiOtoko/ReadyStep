<?php

namespace App\Security;

use Kreait\Firebase\Contract\Auth;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\PassportInterface;

class FirebaseAuthenticator extends AbstractAuthenticator
{
    use TargetPathTrait;

    private $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function supports(Request $request): ?bool
    {
        return true;
        return $request->cookies->has('FIREBASE_ID_TOKEN');
    }

    public function authenticate(Request $request): Passport
    {
        $idTokenString = $request->cookies->get('FIREBASE_ID_TOKEN');

        try {
            $verifiedIdToken = $this->auth->verifyIdToken($idTokenString);
        } catch (\InvalidArgumentException $e) {
            throw new AuthenticationException('Invalid ID token');
        }

        // $user = new FirebaseUser($verifiedIdToken->getClaims()['sub']);

        // return new Passport(
        //     new UserBadge($user->getUsername()),
        //     new FirebaseBadge($verifiedIdToken)
        // );

        return new SelfValidatingPassport(new UserBadge($verifiedIdToken));
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Redirect to the original target path if it exists
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }

        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new Response('Authentication failed', Response::HTTP_UNAUTHORIZED);
    }

    public function createAuthenticatedToken(PassportInterface $passport, string $firewallName): TokenInterface
    {
        return new UsernamePasswordToken($passport->getUser(), null, $firewallName, $passport->getUser()->getRoles());
    }

    public function supportsRememberMe(): bool
    {
        return false;
    }
}
