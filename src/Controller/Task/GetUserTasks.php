<?php

namespace App\Controller\Task;

use App\Entity\Task\Activity;
use App\Entity\Task\Session;
use App\Entity\Task\UserTask;
use App\Utils\Api\ApiPlatformSerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[AsController]
#[Route('/api/sessions/{sessionId}/users/{userId}/tasks', methods: ['GET'])]
class GetUserTasks extends AbstractController
{

    public function __invoke(
        EntityManagerInterface $em,
        ApiPlatformSerializer $serializer,
        int $sessionId,
        int $userId
    ){

        $userTasks = $em->getRepository(UserTask::class)->findBy([
            'session' => $sessionId,
            'user' => $userId
        ]);

      //select activity, task and userTask, activity is the main entity, only for the current user and session
        $userTasks = $em->createQueryBuilder()
            ->select('ut')
            ->from(UserTask::class, 'ut')
            ->andWhere('ut.session = :sessionId AND ut.user = :userId')
            ->setParameter('sessionId', $sessionId)
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getResult()
        ;


        $data = [];
        foreach($userTasks as $userTask){
            $data[$userTask->getTask()->getId()] = $userTask;
        }

        return new Response($serializer->serialize($data, 'json') );
    }

}