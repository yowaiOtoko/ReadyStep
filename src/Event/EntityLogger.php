<?php

namespace App\Event;

use App\Entity\Task\Activity;
use App\Entity\User;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[AsDoctrineListener('prePersist')]
class EntityLogger
{
    private $user;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->user = $tokenStorage->getToken() ? $tokenStorage->getToken()->getUser() : null;
    }

    public function prePersist(LifecycleEventArgs $event): void
    {
        $entity = $event->getObject();
        $entityManager = $event->getObjectManager();

        if (!$entity instanceof Activity) {
            return;
        }

        $user = $entityManager->getRepository(User::class)->findOneByEmail($this->user->getUserIdentifier());

        $entity->setCreatedAt(new \DateTimeImmutable());
        $entity->setCreatedBy($user);

    }
}