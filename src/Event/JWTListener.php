<?php

namespace App\Event;


use App\Entity\PortalUser;
use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class JWTListener
{

    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        /** @var PortalUser */
        $user = $event->getUser();

        $payload            = $event->getData();
        $payload['user_id'] = $user->getId();

        $event->setData($payload);
    }

    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();

        // if (!$user instanceof PortalUser) {
        //     return;
        // }

        $data['userData'] = $this->getUserData($user);

        $event->setData($data);
    }

    public function getUserData(User $user): array
    {
        return [
            'firstName'  => $user->getFirstName(),
            'lastName'  => $user->getLastName(),
            'email'  => $user->getEmail(),
            'ability'   => $user->getRoles()
        ];
    }
}
