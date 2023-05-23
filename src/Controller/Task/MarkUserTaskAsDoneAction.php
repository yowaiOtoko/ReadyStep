<?php

namespace App\Controller\Task;

use App\Entity\User;
use App\Entity\Task\Task;
use App\Entity\Task\Session;
use App\Entity\Task\userTask;
use App\Utils\Api\ApiPlatformSerializer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use ApiPlatform\JsonLd\Serializer\ItemNormalizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUser;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

#[AsController]
#[Route('/api/app/session/{sessionId<\d+>}/task/{taskId<\d+>}/completed', name: 'app_user_task_done', methods: ['POST'])]
class MarkUserTaskAsDoneAction extends AbstractController
{

    public function __invoke(
        Request $request,
        ApiPlatformSerializer $serializer,
        EntityManagerInterface $em,
        int $sessionId,
        int $taskId,
    )
    {

        $content = json_decode($request->getContent(), true);
        if(!isset($content['completed'])){
            throw new BadRequestException('Missing completed parameter');
        }

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

        $task = $em->getRepository(Task::class)->find($taskId);
        if(!$task){
            throw new BadRequestException('Task not found');
        }


        /** @var UserTask */
        $userTask = $em->getRepository(UserTask::class)->findOneBy([
            'session' => $session,
            'user' => $user,
            'task' => $task
        ]);

        if(!$userTask){
            $userTask = (new UserTask())
                ->setSession($session)
                ->setUser($user)
                ->setTask($task)
                ->setCreatedAt(new \DateTimeImmutable())
            ;
        }

        if($content['completed']){

            $userTask
                ->setCompletedAt(new \DateTimeImmutable())
                ->setCompleted(true)
            ;
        }else{
            $userTask
                ->setCompletedAt(null)
                ->setCompleted(false)
            ;
        }

        $em->persist($userTask);
        $em->flush();

        return new Response($serializer->serialize($userTask));
    }


}