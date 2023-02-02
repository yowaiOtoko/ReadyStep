<?php
namespace App\Controller;

use Symfony\Component\HttpComponent\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\UserTask;
use App\Entity\User;
use App\Entity\Task;
use App\Entity\Session;

#[Route('/task', name: 'task_')]
class TaskController extends AbstractController
{
    #[Route('/check/{sessionId}/{taskId}/{userId}/{userTaskId}', name: 'check')]
    public function checkTask(ManagerRegistry $doctrine, int $taskId, int $userId, int $sessionId, $userTaskId)
    {
        $session = $doctrine->getRepository(Session::class)->findOneBy([
            'id' => $sessionId
        ]);

        $user = $doctrine->getRepository(User::class)->findOneBy([
            'id' => $userId
        ]);

        if (!empty($userTaskId)) {
            $entityManager = $doctrine->getManager();

            $userTask = $doctrine->getRepository(UserTask::class)->findOneBy([
                'id' => $userTaskId
            ]);

            $userTask->setCompleted(true);

            $entityManager->persist($userTask);
            $entityManager->flush();   
        } else {
            $entityManager = $doctrine->getManager();
            $userTask = new UserTask;

            $task = $doctrine->getRepository(Task::class)->findOneBy([
                'id' => $taskId
            ]);

            $userTask->setCompleted(true);
            $userTask->setCreatedAt($task->getCreatedAt());
            $userTask->setCompletedAt(new \DateTimeImmutable);
            $userTask->setUser($user);
            $userTask->setTask($task);
            $userTask->setSession($session);

            $entityManager->persist($userTask);
            $entityManager->flush();
        }

        return $this->redirectToRoute('session_index', [
            'sessionName' => $session->getName(),
            'userName' => $user->getName()
        ]);
    }

    #[Route('/uncheck/{userTaskId}', name: 'uncheck')]
    public function uncheckTask(ManagerRegistry $doctrine, int $userTaskId)
    {
        $entityManager = $doctrine->getManager();

        $userTask = $doctrine->getRepository(UserTask::class)->findOneBy([
            'id' => $userTaskId
        ]);

        $userTask->setCompleted(false);

        $entityManager->persist($userTask);
        $entityManager->flush();

        return $this->redirectToRoute('session_index', [
            'sessionName' => $userTask->getSession()->getName(),
            'userName' => $userTask->getUser()->getName(),
        ]);
    }
}
