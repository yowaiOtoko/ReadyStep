<?php

namespace App\Controller\Task;

use App\Entity\User;
use App\Entity\Task\Session;
use App\Entity\Task\UserTask;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUser;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

#[AsController]
#[Route('/api/app/session/{sessionId}/join', name: 'app_session_join', methods: ['POST'])]
class JoinSessionAction extends AbstractController
{

    public function __invoke(
        NormalizerInterface $serializer,
        EntityManagerInterface $em,
        int $sessionId,
    ): JsonResponse
    {
        /** @var Session */
        $session = $em->getRepository(Session::class)->find($sessionId);
        if(!$session){
            throw new BadRequestException('Session not found');
        }

        /** @var JWTUser */
        $jwtUser = $this->getUser();
        $user = $em->getRepository(User::class)->findOneByEmail($jwtUser->getUserIdentifier());

        if(!$user){
            throw new BadRequestException('User not found');
        }

        if(!$session->getUsers()->contains($user)){
            $session->addUser($user);
            foreach($session->getActivity()->getTaskGroups() as $group){
                foreach($group->getTasks() as $task){
                    $userTask = new UserTask();
                    $userTask->setTask($task)
                        ->setUser($user)
                        ->setSession($session);
                    $em->persist($userTask);
                }
            }
        }


        $em->persist($session);
        $em->flush();


        return new JsonResponse($session);
    }

}