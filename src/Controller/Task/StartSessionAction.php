<?php

namespace App\Controller\Task;

use App\Entity\Task\Session;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\Task\SessionRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

#[AsController]
#[Route('api/app/session/{sessionId}/start', name: 'app_session_start', methods: ['POST'])]
class StartSessionAction extends AbstractController
{

    public function __invoke(
        SessionRepository $sessionRepo,
        EntityManagerInterface $em,
        int $sessionId,
    ): JsonResponse
    {
        $session = $sessionRepo->find($sessionId);
        if(!$session){
            throw new BadRequestException('Session not found');
        }

        $session = (new Session)
            ->setStartedAt(new \DateTimeImmutable())
            ->setIsPaused(false)
        ;

        $em->flush();

        return new JsonResponse($session);
    }
}