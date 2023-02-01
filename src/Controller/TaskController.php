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
    #[Route('/check/{sessionId}/{taskId}/{userId}', name: 'check')]
    public function checkTask(int $taskId, int $userId, int $sessionId, ManagerRegistry $doctrine)
    {
        $entityManager = $doctrine->getManager();
        $userTask = new UserTask;

        $task = $doctrine->getRepository(Task::class)->findOneBy([
            'id' => $taskId
        ]);
        $user = $doctrine->getRepository(User::class)->findOneBy([
            'id' => $userId
        ]);
        $session = $doctrine->getRepository(Session::class)->findOneBy([
            'id' => $sessionId
        ]);

        $userTask->setCompleted(true);
        $userTask->setCreatedAt($task->getCreatedAt());
        $userTask->setCompletedAt(new \DateTimeImmutable);
        $userTask->setUser($user);
        $userTask->setTask($task);
        $userTask->setSession($session);

        $entityManager->persist($userTask);
        $entityManager->flush();

        return $this->redirectToRoute('session_index', [
            'sessionName' => $session->getName(),
            'userName' => $user->getName()
        ]);
    }

    public function unCheckTask()
    {

    }
}
