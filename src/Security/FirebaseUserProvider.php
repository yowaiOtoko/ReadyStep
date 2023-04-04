<?php

namespace App\Security;

use App\Entity\User;
use Kreait\Firebase\Contract\Auth;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class FirebaseUserProvider implements UserProviderInterface
{
    private $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function loadUserByIdentifier($email): UserInterface
    {
        try {
            $firebaseUser = $this->auth->getUserByEmail($email);
        } catch (\Exception $e) {
            throw new UserNotFoundException(sprintf('User "%s" not found.', $email));
        }

        return new User($firebaseUser->uid);
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $this->loadUserByIdentifier($user->getUserIdentifier());
    }

    public function supportsClass($class)
    {
        return User::class === $class;

    }
}